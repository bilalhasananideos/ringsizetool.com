/**
 * What the sizer is showing, as two independent axes.
 *
 * The tool used to offer four buttons — MM / CM / Inches / Circumference —
 * which put a *measurement* in a group of *units*. The cost was real: the
 * circumference reading was millimetres only, so anyone measuring a finger
 * with a paper strip marked in inches had nowhere to go, and "what you
 * measured" and "what unit you want it in" could not be chosen independently.
 *
 * Here they are separate: measure × unit = six valid modes. Everything the
 * component renders on the server and everything the client script does at
 * runtime is derived from this one table, so the two cannot disagree.
 */

import { ISO_MIN, ISO_MAX } from './ringSizes.ts';

export type Measure = 'dia' | 'circ';
export type Unit = 'mm' | 'cm' | 'in';
export type ModeKey = `${Measure}-${Unit}`;

/**
 * Slider range, in millimetres of inner diameter.
 *
 * Derived, not chosen: these are the exact bounds within which ALL seven size
 * systems answer. ISO 8653 is the binding constraint at both ends — it is
 * defined for circumferences 41-76 mm, and `euFromCircumference` rounds, so it
 * answers across the rounding band 40.5-76.5 mm. Every other system reaches
 * further (UK to 76.75 mm, India to 77.5 mm) or starts lower (JP at 12.83 mm),
 * so pinning to ISO's band is what makes all four result cards populated at
 * every slider position.
 *
 * The previous 11.64-25 mm range showed "US 16½" beside three em dashes at the
 * top and left EU/JP/India blank below 12.89 mm — a real size next to three
 * refusals reads as a broken tool, not an honest one.
 *
 * `verify-sizes.ts` proves ISO really is the binding constraint by walking the
 * whole range and asserting no system returns null inside it.
 */
/* The band is [41 - 0.5, 76 + 0.5) — closed below, OPEN above, because
   `Math.round` breaks ties upward. 40.5 mm of circumference rounds to EU 41
   and is in; 76.5 mm rounds to EU 77 and is one past the standard, so the top
   is backed off by 0.01 mm of circumference, one unit of the finest grid this
   tool prints. Without that step the slider's own maximum showed an em dash. */
export const DIA_MIN_MM = (ISO_MIN - 0.5) / Math.PI;         // 12.8916…
export const DIA_MAX_MM = (ISO_MAX + 0.5 - 0.01) / Math.PI;  // 24.3475…

/**
 * Millimetres of the measured length per unit.
 *
 * Stored as a MULTIPLIER (mm per unit), not a divisor, and this matters. The
 * table used to hold { cm: 0.1 } and `toDia` divided by it — but 1.65 / 0.1 is
 * 16.499999999999996, not 16.5, and 16.5 mm is exactly the JP 11/12 boundary.
 * Typing 1.65 cm reported one Japanese size smaller than typing 16.5 mm for the
 * same ring. 1.65 * 10 is exact, so multiply going in and divide going out.
 */
const MM_PER_UNIT = { mm: 1, cm: 10, in: 25.4 } as const;

/** A circumference is π diameters. Nothing else differs between the two. */
const PER_DIA = { dia: 1, circ: Math.PI } as const;

export const MEASURES: { key: Measure; label: string; short: string }[] = [
  { key: 'dia',  label: 'Inside Diameter',      short: 'Diameter' },
  { key: 'circ', label: 'Inside Circumference', short: 'Circumference' },
];

export const UNITS: { key: Unit; label: string; short: string }[] = [
  { key: 'mm', label: 'mm', short: 'MM' },
  { key: 'cm', label: 'cm', short: 'CM' },
  { key: 'in', label: 'in', short: 'Inches' },
];

export interface ModeSpec {
  key: ModeKey;
  measure: Measure;
  unit: Unit;
  /** Text under the big readout. */
  label: string;
  /** Unit suffix beside the big readout. */
  unitLabel: string;
  /** Decimal places for every number this mode prints. */
  dp: number;
  /** Slider granularity, as the string an <input step> wants. */
  step: string;
  /** How far one ± click moves. */
  nudge: number;
  min: number;
  max: number;
}

/**
 * Precision per mode. Two separate obligations, and the table used to meet
 * only the first:
 *
 * 1. STEP — the slider must be able to land on any real size. The tightest
 *    size increment is a US quarter size, 0.2032 mm of diameter, so every
 *    step below is under 0.06 mm of diameter-equivalent; worst-case snapping
 *    error is half a step. Inches used to step 0.005 in (0.127 mm), which
 *    sounds fine until you notice the grid starts at an irrational bound: US
 *    11 sits at 0.810 in but the slider could only reach 0.808, reporting
 *    20.53 mm for a size whose real diameter is 20.574 mm.
 *
 * 2. DP — the printed number must round-trip. Type what the tool shows back
 *    into the tool and you must get the same size. Centimetres at 2 dp is
 *    0.1 mm of resolution, but a UK half size is 0.199 mm of diameter and a
 *    Japanese size is 0.333 mm, so cm literally could not express them: 17 of
 *    the 21 chart rows came back as the wrong size. 3 dp is 0.01 mm, matching
 *    what the mm column already had.
 *
 * `verify-sizes.ts` asserts both properties across all six modes, so this
 * table cannot regress quietly the way it did.
 */
const PRECISION: Record<Measure, Record<Unit, { dp: number; step: string; nudge: number }>> = {
  dia: {
    mm: { dp: 2, step: '0.01',  nudge: 0.1   },
    cm: { dp: 3, step: '0.001', nudge: 0.01  },
    in: { dp: 3, step: '0.001', nudge: 0.005 },
  },
  circ: {
    mm: { dp: 2, step: '0.05',  nudge: 0.25  },
    cm: { dp: 3, step: '0.005', nudge: 0.025 },
    in: { dp: 4, step: '0.002', nudge: 0.01  },
  },
};

/** The measured length, in this mode's unit, for a given inner diameter in mm. */
export const toMode = (diaMm: number, m: Measure, u: Unit) =>
  (diaMm * PER_DIA[m]) / MM_PER_UNIT[u];

/** The same conversion back to inner diameter in mm. */
export const toDia = (value: number, m: Measure, u: Unit) =>
  (value * MM_PER_UNIT[u]) / PER_DIA[m];

export function modeSpec(m: Measure, u: Unit): ModeSpec {
  const p = PRECISION[m][u];
  return {
    key: `${m}-${u}`,
    measure: m,
    unit: u,
    label: MEASURES.find((x) => x.key === m)!.label,
    unitLabel: UNITS.find((x) => x.key === u)!.label,
    dp: p.dp,
    step: p.step,
    nudge: p.nudge,
    min: toMode(DIA_MIN_MM, m, u),
    max: toMode(DIA_MAX_MM, m, u),
  };
}

/**
 * Bounds are rounded INWARD to the mode's own decimal grid, never outward: a
 * label must never advertise a value the slider cannot reach, and starting the
 * grid at an irrational bound (DIA_MIN in inches is 0.4330708…) offsets every
 * step after it.
 */
export const ceilTo = (v: number, dp: number) => (Math.ceil(v * 10 ** dp) / 10 ** dp).toFixed(dp);
export const floorTo = (v: number, dp: number) => (Math.floor(v * 10 ** dp) / 10 ** dp).toFixed(dp);

const isMeasure = (v: unknown): v is Measure => v === 'dia' || v === 'circ';
const isUnit = (v: unknown): v is Unit => v === 'mm' || v === 'cm' || v === 'in';

/**
 * Read a mode out of a query string, tolerating the spellings a person would
 * actually type or link to. Anything unrecognised falls back rather than
 * throwing — a bad URL should show the default tool, not a broken one.
 */
export function modeFromParams(
  params: URLSearchParams,
  fallback: { measure: Measure; unit: Unit },
): { measure: Measure; unit: Unit } {
  const rawM = (params.get('measure') ?? '').toLowerCase();
  const rawU = (params.get('unit') ?? '').toLowerCase();

  const m = rawM === 'circumference' ? 'circ' : rawM === 'diameter' ? 'dia' : rawM;
  const u = rawU === 'inches' || rawU === 'inch' ? 'in' : rawU;

  return {
    measure: isMeasure(m) ? m : fallback.measure,
    unit: isUnit(u) ? u : fallback.unit,
  };
}
