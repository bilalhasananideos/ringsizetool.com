/**
 * Analytics consent — the one place its rules live.
 *
 * Why this exists (read 2 Oct 2026, not assumed):
 *   - Google's EU User Consent Policy covers visitors in the EEA, the UK and
 *     Switzerland and requires consent for "the use of cookies or other local
 *     storage where legally required" (google.com/about/company/user-consent-policy/).
 *   - EEA: the CNIL, applying the ePrivacy rules, says most large analytics
 *     offerings "do not fall within the scope of the exemption, regardless of
 *     their configuration", naming Google Analytics (cnil.fr, Sheet n°16 and
 *     "Mesurer la fréquentation"). So GA4 needs consent there.
 *   - UK: the ICO's guidance (finalised 29 Apr 2026) has a statistical-purposes
 *     exception, but only for a SOLE purpose of improving the site. Whether GA4
 *     qualifies was not settled, so this site asks instead of guessing.
 *   - A static site cannot tell where a visitor is, so everyone is asked.
 *
 * Banner rules it follows (ICO "How do we manage consent in practice?",
 * EDPB cookie banner taskforce report, 17 Jan 2023): reject as easy as accept,
 * on the first layer, same weight; nothing set before a positive action;
 * withdrawal as easy as giving; re-ask after six months.
 *
 * Google tag behaviour follows Google's "basic" consent mode: the tag is not
 * loaded at all until the visitor accepts, so nothing is sent before then —
 * "not even the default consent status" (developers.google.com, consent mode
 * overview, updated 2026-07-30). Ad signals stay off even after acceptance:
 * this site has no ads, and the visitor is asked about analytics only.
 *
 * ⚠️ This is NOT a TCF-certified CMP. Google requires one for personalised
 * ads to EEA/UK users (AdSense help 13554116). Replace this banner with a
 * certified CMP before any ad code is added.
 */

/** localStorage key, in the site's `rst.` family. Listed on /privacy. */
export const CONSENT_STORE_KEY = 'rst.consent';

/** Bump when the banner's wording or purpose changes: a stored answer to an
 *  older question is not consent to the new one, so everyone is asked again. */
export const CONSENT_VERSION = 1;

/** Six months, the period the ICO suggests before asking again. Applied to
 *  both answers, so a "yes" is renewed as often as a "no" is revisited. */
export const CONSENT_MAX_AGE_DAYS = 182;
export const CONSENT_MAX_AGE_MS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
