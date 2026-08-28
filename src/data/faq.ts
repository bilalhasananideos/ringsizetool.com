/**
 * FAQ.
 *
 * ⚠️ THE QUESTIONS ARE VERBATIM. Every one below was collected from Google
 * "People also ask" for `ring sizer` and is recorded in RESEARCH.md. Never
 * reword them and never invent a new one — the whole point is that a real
 * person searched for exactly this string. Answers are ours; questions are not.
 *
 * Numbers come from the conversion engine, never typed, so an answer can never
 * drift from what the tool says.
 */
import { fromDiameter, diameterFromUs, AVERAGE_US_SIZE, MM_PER_INCH } from './ringSizes';

const six = fromDiameter(diameterFromUs(6));
const seven = fromDiameter(diameterFromUs(7));
const nine = fromDiameter(diameterFromUs(9));

const mm = (n: number) => `${n.toFixed(2)} mm`;
const inch = (n: number) => `${n.toFixed(2)} in`;

export interface Faq {
  q: string;
  /** Plain text. Used for both the visible answer and the FAQPage schema. */
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'How can I measure my ring size at home?',
    a: `Two ways, both on this page. If you own a ring that fits, calibrate your screen against a bank card and match the on-screen circle to the ring's inner edge. If you do not, wrap a strip of paper around the base of your finger, mark the overlap, measure the flat strip against a ruler and type the length in. Both give you an inner diameter, which is the only measurement ring sizes are actually built from.`,
  },
  {
    q: 'Can I measure my ring size on my phone?',
    a: `Yes, and a phone is often better than a laptop because you can hold the ring flat against the glass. Calibrate on the phone itself — screen scale differs between devices, so a calibration saved on your laptop will not be right here. Keep browser zoom at 100%.`,
  },
  {
    q: 'Is there a virtual ring sizer?',
    a: `This is one. A virtual ring sizer draws a circle on your screen at a known physical size so you can compare a real ring against it. The part that matters is calibration: without it the tool is guessing how large a millimetre is on your display, and the answer can be a full size out.`,
  },
  {
    q: 'Is size 7 a large ring?',
    a: `No. US 7 is an inner diameter of ${mm(seven.diameterMm)} and sits just above the most common women's size of ${AVERAGE_US_SIZE.women} and below the most common men's size of ${AVERAGE_US_SIZE.men}. It is one of the most frequently sold sizes there is.`,
  },
  {
    q: 'How can I find out my ring size?',
    a: `Measure the inner diameter of a ring that already fits, or the circumference of the finger itself, then convert. Everything else — printable charts, string tricks, guessing from glove size — is a less direct route to the same two numbers. Diameter and circumference are locked together as circumference = π × diameter, so either one gives you the other exactly.`,
  },
  {
    q: 'Can I size my ring at home?',
    a: `You can measure at home accurately enough to buy most rings. You cannot resize one at home — that needs a jeweller's saw, solder and mandrel. If the ring is an engagement ring, or in tungsten, titanium, ceramic or steel, confirm the measurement with a jeweller before buying, because those cannot be altered afterwards.`,
  },
  {
    q: 'Does ring size vary by finger?',
    a: `Considerably. Every finger differs, and the same finger differs between hands — a ring worn on the right hand is commonly a quarter to a half size away from the left. Measure the exact finger the ring will live on. A measurement from any other finger is not transferable.`,
  },
  {
    q: 'How can I tell my ring size without measuring?',
    a: `You cannot, reliably. Estimates from height, glove size or shoe size are guesses, and the range they cover is wider than the whole sold size range. The closest thing to "without measuring" is borrowing a ring that already fits and comparing it to the circle on this page, which takes about a minute.`,
  },
  {
    q: 'Can I measure my ring online?',
    a: `Yes — this page does it entirely in your browser. Nothing is uploaded, no photo is taken and no account is needed. The calibration is stored only on your own device so a repeat visit skips that step.`,
  },
  {
    q: 'Is there an app to check your ring size?',
    a: `There are several, but you do not need to install anything. A browser page can measure exactly as accurately as an app, because both depend on the same thing: calibrating the screen against an object of known size. This page uses a bank card, which is 85.60 × 53.98 mm everywhere in the world under ISO/IEC 7810.`,
  },
  {
    q: 'What is the most common ring size?',
    a: `US ${AVERAGE_US_SIZE.women} for women — an inner diameter of ${mm(six.diameterMm)} — and US ${AVERAGE_US_SIZE.men} for men. Most adult sizes fall between US 4 and US 13. Being outside that band is normal, it just narrows what is available off the shelf.`,
  },
  {
    q: 'What is the best ring sizer to use?',
    a: `A jeweller's steel ring gauge set is the most accurate thing there is, and it is what you should use for an engagement ring. For buying online, a calibrated on-screen sizer or a correctly printed paper sizer is close enough for a resizable ring. The main failure in every method is scale: an uncalibrated screen and a printer set to "fit to page" are both wrong in the same way.`,
  },
  {
    q: 'Can I size my ring on my phone?',
    a: `Yes. Open this page on the phone, calibrate against a bank card held flat on the screen, then lay the ring on the glass and match the circle. Do not reuse a calibration from another device — pixel density differs, and that is exactly what calibration corrects for.`,
  },
  {
    q: 'How do I know my correct ring size?',
    a: `Measure more than once, on different days, and at room temperature. Fingers swell with heat, salt and exercise and shrink when cold, and the swing across a day can cross a half size. If two measurements disagree, take the larger — a slightly loose ring is wearable, a tight one is not.`,
  },
  {
    q: 'Is a ring sizer universal?',
    a: `The measurement is; the numbering is not. Inner diameter in millimetres means the same thing everywhere. The size label does not — US uses numbers, the UK uses letters, EU/ISO uses the circumference itself, and Japan uses its own scale. That is why this tool reports the diameter alongside every size: the millimetre figure is the one no jeweller can misread.`,
  },
  {
    q: 'Is a size 7 ring big for a girl?',
    a: `No. US 7 (${mm(seven.diameterMm)} inner diameter) is one step above the most common women's size of US ${AVERAGE_US_SIZE.women} and well inside the ordinary range. Adult women's sizes commonly run from about US 4 to US 9.`,
  },
  {
    q: 'How do I convert my finger diameter to ring size?',
    a: `Multiply the diameter by π to get the circumference, then read off the scale you need. EU/ISO 8653 sizes are the circumference in millimetres; France, Italy, Spain, Brazil and most Indian jewellers use that number minus 40; the US scale is diameter in inches, where size 0 is 0.458 in and each size adds 0.032 in. The tool on this page does all of these at once from one diameter, which is why its outputs cannot contradict each other.`,
  },
  {
    q: 'How to size a ring with a sizer?',
    a: `With a set of graduated rings, slide each one on until you find the one that passes the knuckle with slight resistance and sits without spinning. With a mandrel, drop the ring over the cone and read the mark where it stops. With this page, match the on-screen circle to the inside of the ring — not the outside, which includes the metal.`,
  },
  {
    q: 'Can I size a ring at home?',
    a: `Measuring, yes. Physically resizing, no — home methods such as ring adjusters, tape or glue-in inserts change the fit but not the ring, and they can mark soft metals. Treat them as a temporary fix while you have the ring properly sized.`,
  },
  {
    q: 'Which rings cannot be resized?',
    a: `Eternity rings set with stones all the way round, tension settings, and anything made of tungsten, titanium, ceramic or stainless steel. There is no plain section of metal to cut and rejoin, and those materials cannot be worked the way gold or silver can. For any of them, get the size confirmed by a jeweller before ordering.`,
  },
  {
    q: 'What is 7 inches in ring size?',
    a: `Nothing — 7 inches is far too large for a finger, and anyone measuring that has almost certainly measured a wrist. A ring is roughly 2 inches around: US size 7 has an inner circumference of ${inch(seven.circumferenceIn)} (${mm(seven.circumferenceMm)}) and an inner diameter of ${inch(seven.diameterIn)} (${mm(seven.diameterMm)}). If you meant 7 inches of paper strip wrapped around your finger, measure again — the strip should read close to ${inch(seven.circumferenceIn)}.`,
  },
];

/* ── Schema.org ───────────────────────────────────────────────────────────
 * Built from the same array the page renders, so the visible answer and the
 * structured answer can never disagree. Google penalises exactly that.
 */
export const faqPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const howToSchema = (url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to measure your ring size at home',
  description:
    'Calibrate your screen against a bank card, then measure a ring you already own or your finger with a strip of paper.',
  totalTime: 'PT2M',
  tool: [
    { '@type': 'HowToTool', name: 'Any bank card (ISO/IEC 7810 ID-1, 85.60 × 53.98 mm)' },
    { '@type': 'HowToTool', name: 'A ring that already fits, or a strip of paper and a ruler' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Calibrate your screen',
      text: 'Hold a bank card upright against the screen and drag the slider until the outline matches its edges exactly. Every card is 85.60 × 53.98 mm, so this establishes how many pixels your screen puts in a millimetre. Keep browser zoom at 100%.',
      url: `${url}#tool`,
    },
    {
      '@type': 'HowToStep',
      name: 'Measure the ring or the finger',
      text: "Place a ring that already fits on the screen and adjust the circle until it sits inside the ring's inner edge. If you have no ring, wrap a paper strip around the base of the finger, mark the overlap and enter the flat length.",
      url: `${url}#tool`,
    },
    {
      '@type': 'HowToStep',
      name: 'Read your size',
      text: 'The result shows US/Canada, UK/Australia, EU/ISO, Japan, India, France/Italy/Spain and Brazil sizes at once, plus inner diameter and circumference in millimetres and inches.',
      url: `${url}#tool`,
    },
  ],
});

export const webAppSchema = (url: string, name: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  url,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any modern web browser',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Screen calibration against a bank card (ISO/IEC 7810 ID-1)',
    'Measure from a ring you already own',
    'Measure a finger with a paper strip',
    'Enter a diameter you already know',
    'US, UK, EU/ISO, Japan, India, France/Italy/Spain and Brazil sizes',
    'Runs entirely in the browser — nothing is uploaded',
  ],
});

/**
 * Breadcrumbs. Only meaningful once a second page exists — a one-item
 * breadcrumb on a single-level site says nothing, so the homepage passes just
 * itself and subpages pass Home + themselves.
 */
export const breadcrumbSchema = (
  trail: ReadonlyArray<{ name: string; url: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: t.url,
  })),
});
