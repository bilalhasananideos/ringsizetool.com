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

export type Measure = 'dia' | 'circ';
export type Unit = 'mm' | 'cm' | 'in';
export type ModeKey = `${Measure}-${Unit}`;

/** Slider range, in millimetres of inner diameter. */
/* 11.64, not 11 — the slider's own bottom used to sit below US 0 (11.6332 mm),
   so every system correctly answered "—" across the first 0.6 mm of travel.
   Six em dashes at the control's own minimum reads as broken, not honest.
   Raised 28 Aug 2026 so the bottom of every mode always shows a real size. */
export const DIA_MIN_MM = 11.64;
export const DIA_MAX_MM = 25;

/** Millimetres of the measured length per unit. */
const PER_MM = { mm: 1, cm: 0.1, in: 1 / 25.4 } as const;

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
 * Precision per unit, expressed for DIAMETER. The circumference variants are
 * these scaled by π and then rounded to a clean decimal, because a step of
 * 0.0314159 mm makes the slider report values like 51.86929133858268.
 *
 * The targets: ~0.01 mm of diameter per slider step in every mode, which is
 * an order of magnitude finer than the smallest step any size system uses
 * (a US quarter size is 0.2032 mm), and finer than anyone can achieve holding
 * a ring against glass. Being coarser than the display precision is the bug
 * worth avoiding — inches used to render at 2 dp against a 0.001 in step, so
 * two clicks of ± appeared to do nothing.
 */
const PRECISION: Record<Measure, Record<Unit, { dp: number; step: string; nudge: number }>> = {
  dia: {
    mm: { dp: 2, step: '0.01',  nudge: 0.1   },
    cm: { dp: 2, step: '0.01',  nudge: 0.01  },
    in: { dp: 3, step: '0.005', nudge: 0.005 },
  },
  circ: {
    mm: { dp: 2, step: '0.05',  nudge: 0.25  },
    cm: { dp: 2, step: '0.01',  nudge: 0.05  },
    in: { dp: 3, step: '0.005', nudge: 0.01  },
  },
};

/** The measured length, in this mode's unit, for a given inner diameter in mm. */
export const toMode = (diaMm: number, m: Measure, u: Unit) =>
  diaMm * PER_DIA[m] * PER_MM[u];

/** The same conversion back to inner diameter in mm. */
export const toDia = (value: number, m: Measure, u: Unit) =>
  value / PER_MM[u] / PER_DIA[m];

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
