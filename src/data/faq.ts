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
    a: `Two ways, both on this page. If you own a ring that fits, calibrate your screen against a bank card, then size the on-screen circle until its outer edge meets the inside of the band. If you do not, wrap a strip of paper around the base of your finger, mark the overlap, measure the flat strip against a ruler and type the length in. Both give you an inner diameter, which is the only measurement ring sizes are actually built from.`,
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
    a: `Yes. Open this page on the phone, calibrate against a bank card held flat on the screen, then lay the ring on the glass and size the circle to the inside of the band. Do not reuse a calibration from another device — pixel density differs, and that is exactly what calibration corrects for.`,
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
/**
 * Per-page FAQs.
 *
 * Same rule as FAQS above: every question is verbatim from Google "People also
 * ask", collected from the SERPs recorded in RESEARCH.md (28-29 Aug 2026).
 * They are grouped by the page whose keyword produced them, so each FAQPage
 * answers the queries around its own page rather than the site's in general.
 *
 * ⚠️ No question appears on two pages. Two FAQPage entities answering the same
 * string is a duplicate the site inflicts on itself, and Google picks one - so
 * anything already in FAQS above is deliberately absent here, including the
 * phone questions and "What is 7 inches in ring size?".
 */
export const CHART_FAQS: Faq[] = [
  {
    q: 'What is a size 7 ring equivalent to?',
    a: `US 7 is ${mm(seven.diameterMm)} of inner diameter and ${mm(seven.circumferenceMm)} around. That is UK ${seven.uk}, EU/ISO ${seven.eu}, Japan ${seven.jp} and India ${seven.in}. The diameter is the figure to give a jeweller, because every one of those national sizes is derived from it.`,
  },
  {
    q: 'Are UK and US ring sizes the same?',
    a: `No, and they are not even the same kind of scale. US sizes are numbers on a scale with no governing standard; UK sizes are letters defined by BS EN 28653, one letter per 1.25 mm of inner circumference. US ${six.us} is UK ${six.uk}, and US ${seven.us} is UK ${seven.uk}. Because the two scales step by different amounts, half of all US sizes land between two UK letters.`,
  },
  {
    q: 'What is US size 7 to UK?',
    a: `UK ${seven.uk}. Some charts round that to ${String(seven.uk).replace('½', '')} instead. Our value is computed from the standard: ${mm(seven.circumferenceMm)} of circumference, minus the 37.5 mm the scale starts at, divided by 1.25 mm per letter.`,
  },
  {
    q: 'What is a size 7 ring in mm?',
    a: `${mm(seven.diameterMm)} across the inside. Around the inside it is ${mm(seven.circumferenceMm)} — the number a paper strip measures, and the one EU/ISO sizes are literally equal to.`,
  },
  {
    q: 'What is 10 mm in ring size?',
    a: `Nothing wearable. 10 mm of inner diameter is well below US 0, which starts at 11.63 mm, so no adult ring scale defines it. If you measured 10 mm you almost certainly measured across the wrong axis, or measured a child's ring. If 10 mm was a circumference rather than a diameter, that is smaller still — about 3.2 mm across.`,
  },
  {
    q: 'How do you tell your ring size in mm?',
    a: `Measure the inner diameter of a ring that fits: lay it on the calibrated circle in our sizer and match the circle to the inside edge, or measure it with a ruler across the widest point of the hole. If you are measuring a finger rather than a ring, you get circumference instead — divide by π (3.1416) for diameter, or let the tool switch for you.`,
  },
  {
    q: 'What is US size 7 in Japan?',
    a: `Japanese size ${seven.jp}. Japan uses JIS S 4700, which runs from 1 to 35 and steps by a third of a millimetre of diameter — so Japanese sizes are roughly three times as fine-grained as US sizes, and land closer to your true measurement.`,
  },
  {
    q: 'What is ring size 7 in India?',
    a: `Indian size ${seven.in}. State plainly, though: India has no ring size standard. The figure comes from the scale four large Indian jewellers agree on — inner circumference in millimetres minus 40 — which is the same arithmetic France, Italy, Spain and Brazil use. Check against your jeweller's own chart before buying.`,
  },
  {
    q: 'How does India measure ring size?',
    a: `By a number that tracks inner circumference: Indian size = circumference in millimetres − 40. US ${six.us} is ${mm(six.circumferenceMm)} around, so Indian ${six.in}. There is no Indian standards body defining it, which is why Indian charts disagree with each other more than any other country's.`,
  },
  {
    q: 'How do I convert inches to ring size?',
    a: `Multiply by ${MM_PER_INCH} to get millimetres, then read the size off that. ${inch(seven.diameterIn)} of diameter is ${mm(seven.diameterMm)}, which is US ${seven.us}. One warning: a quarter US size is about 0.008 in, so inches written to two decimal places cannot express one — measure in millimetres if you have the choice.`,
  },
];

export const METHOD_FAQS: Faq[] = [
  {
    q: 'What is the easiest way to measure ring size at home?',
    a: `Copy a ring that already fits. It is rigid, it does not swell, and it takes under a minute: calibrate the screen against a bank card, then match the on-screen circle to the ring's inside edge. Measuring a finger is the fallback, not the first choice.`,
  },
  {
    q: 'How can I measure my ring size at home without a ruler?',
    a: `Use the calibrated circle on this page — a bank card replaces the ruler, because every card is 85.60 × 53.98 mm by ISO/IEC 7810. Lay a ring on the circle and adjust until they match. If you have no ring either, wrap a strip of paper round the finger, mark the overlap, then measure the strip against the same calibrated scale.`,
  },
  {
    q: 'How to check ring size with thread?',
    a: `You can, but expect it to read small. Thread and string stretch under the tension of wrapping, and one full US size is only ${mm(seven.circumferenceMm - six.circumferenceMm)} of circumference — a stretch you would not feel. Paper does not stretch. If thread is all you have, mark it, lay it flat with no tension and measure it then.`,
  },
  {
    q: 'What size ring do I wear if my finger is 2.5 inches?',
    a: `2.5 inches around is 63.5 mm of circumference, or ${mm(63.5 / Math.PI)} of diameter — about US ${fromDiameter(63.5 / Math.PI).us}, UK ${fromDiameter(63.5 / Math.PI).uk}, EU ${fromDiameter(63.5 / Math.PI).eu}. Note that 2.5 inches is a circumference, not a diameter; mixing the two up puts you out by roughly three times.`,
  },
  {
    q: 'What is my ring size if the string is 2.5 inches?',
    a: `Nominally US ${fromDiameter(63.5 / Math.PI).us} — 63.5 mm of circumference. But if that 2.5 inches came off string rather than paper, treat it as a floor rather than an answer: string stretches as you pull it round, and the error always runs the same way, making the finger read smaller than it is.`,
  },
  {
    q: 'How big is a 7 size ring?',
    a: `${mm(seven.diameterMm)} across the inside and ${mm(seven.circumferenceMm)} around — roughly the diameter of a AA battery. It is one size above the most commonly sold women's size and two below the most common men's, so it sits in the middle of what jewellers stock rather than at either end.`,
  },
  {
    q: "How can I find out my husband's ring size without him knowing?",
    a: `Borrow a ring he already wears and measure it here — it is the only method that is genuinely accurate, and it takes two minutes. Failing that, press one into a bar of soap and measure the impression, or ask someone close to him. Tracing round his finger with a pen and comparing hand sizes both sound reasonable and neither survives contact with a ruler.`,
  },
];

export const AVERAGE_FAQS: Faq[] = [
  {
    q: 'Is ring size 7 big for a woman?',
    a: `No. US 7 is one size above the commonly quoted average of ${AVERAGE_US_SIZE.women}, which is a difference of ${mm(seven.diameterMm - six.diameterMm)} of finger — less than a millimetre. It is squarely inside the range every jeweller stocks.`,
  },
  {
    q: 'Is a size 8 ring big for a woman?',
    a: `It is above average and entirely ordinary. Women's rings are commonly sold from about US 4 to US 8½, so a 8 sits inside that band, towards the upper end. Bear in mind the "average" of US ${AVERAGE_US_SIZE.women} is not a standard — it describes what jewellers sell, not a census of fingers.`,
  },
  {
    q: 'Is ring size 6 small?',
    a: `No — US ${AVERAGE_US_SIZE.women} is the most commonly quoted average for women, ${mm(six.diameterMm)} of inner diameter. It is the middle of the distribution, not the small end.`,
  },
  {
    q: 'Is a size 10 ring big for a woman?',
    a: `It is above the usual women's range, which runs to about US 8½, but "big" is the wrong word — it is simply less commonly stocked in women's styles. US 10 is ${mm(fromDiameter(diameterFromUs(10)).diameterMm)} of diameter, close to the commonly quoted men's average of US ${AVERAGE_US_SIZE.men}.`,
  },
  {
    q: 'Will losing 10 lbs change ring size?',
    a: `It can, but less than people expect, and not predictably — fingers are not where most weight is carried. A change of half a size is common; a full size happens. Day-to-day swing from heat, salt and exercise is often as large, so if you are between sizes after a weight change, measure again on a few different evenings before committing.`,
  },
  {
    q: 'What is a normal size ring for a man?',
    a: `The commonly quoted average is US ${AVERAGE_US_SIZE.men} — ${mm(nine.diameterMm)} of inner diameter, ${mm(nine.circumferenceMm)} around. Men's rings are typically sold from about US 8 to US 13. As with the women's figure, this describes buyers rather than people, and no standards body defines it.`,
  },
  {
    q: 'Is a mens ring size 10 big?',
    a: `No, it is just above the commonly quoted men's average of US ${AVERAGE_US_SIZE.men} — a difference of ${mm(fromDiameter(diameterFromUs(10)).diameterMm - nine.diameterMm)}. It is one of the most stocked men's sizes.`,
  },
  {
    q: "How do I know my man's ring size?",
    a: `Measure a ring he already wears, on the finger you are buying for. Hands differ, and so do fingers on the same hand. If you cannot borrow one, buying at the average of US ${AVERAGE_US_SIZE.men} and choosing a jeweller who resizes free is a far better plan than a more elaborate guess.`,
  },
];

export const PRINTABLE_FAQS: Faq[] = [
  {
    q: 'Do printable ring sizers work?',
    a: `They do, but only if the print came out at true scale — and most do not, because printers default to "fit to page" and shrink everything by a few per cent. A few per cent of a ring is most of a size. That is why our printable page carries a scale-check square you measure with a ruler before you use anything else on the sheet.`,
  },
  {
    q: 'Is there a printable ring sizer?',
    a: `Yes — this page is one, and there is no PDF to download and no email to hand over. Print it, check the square measures the stated width with a ruler, then use the ring-hole gauge or cut out the finger strip.`,
  },
  {
    q: 'Can I make my own ring sizer?',
    a: `Yes. Cut a strip of paper about 1 cm wide and 10 cm long, wrap it round the base of the finger, mark where it overlaps and measure the flat length — that is your inner circumference. A home-made strip is as accurate as a printed one, because the accuracy comes from the ruler, not the paper.`,
  },
];

export const faqPageSchema = (faqs: Faq[] = FAQS) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
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
      text: 'Hold a bank card upright against the screen and drag the slider until the outline matches the short edge of the card, which is 53.98 mm. Every card is 85.60 × 53.98 mm, so this establishes how many pixels your screen puts in a millimetre. Keep browser zoom at 100%.',
      url: `${url}#tool`,
    },
    {
      '@type': 'HowToStep',
      name: 'Measure the ring or the finger',
      text: "Place a ring that already fits on the screen and adjust the circle until its outer edge meets the inside of the band. If you have no ring, wrap a paper strip around the base of the finger, mark the overlap and enter the flat length.",
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
