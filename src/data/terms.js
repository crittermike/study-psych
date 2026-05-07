// Orchestrator for the per-unit term modules.
// Re-exports the global TERMS / CATEGORIES / CONFUSED_PAIRS API the rest of
// the app already depends on, plus per-unit slices used by the unit picker.

import * as sciencePractices from './units/sciencePractices';
import * as biologicalBases from './units/biologicalBases';
import * as cognition from './units/cognition';
import * as developmentLearning from './units/developmentLearning';
import * as socialPsychology from './units/socialPsychology';
import * as motivationEmotionPersonality from './units/motivationEmotionPersonality';
import * as healthPsychology from './units/healthPsychology';
import * as clinicalPsychology from './units/clinicalPsychology';

const UNIT_MODULES = [
  sciencePractices,
  biologicalBases,
  cognition,
  developmentLearning,
  socialPsychology,
  motivationEmotionPersonality,
  healthPsychology,
  clinicalPsychology,
];

export const ALL_UNITS = 'All Units';

export const UNITS = UNIT_MODULES.map(m => m.UNIT);

export const TERMS = UNIT_MODULES.flatMap(m => m.TERMS);

export const CATEGORIES = Array.from(new Set(TERMS.map(t => t.cat)));

export const CONFUSED_PAIRS = UNIT_MODULES.flatMap(m => m.PAIRS || []);

export const KEY_CONCEPTS = UNIT_MODULES.flatMap(m =>
  (m.KEY_CONCEPTS || []).map(k => ({ ...k, unit: m.UNIT }))
);

const TERMS_BY_NAME = (() => {
  const map = new Map();
  TERMS.forEach(t => map.set(t.term, t));
  return map;
})();

export function getTermByName(name) {
  return TERMS_BY_NAME.get(name);
}

export function termsForUnit(unit) {
  if (!unit || unit === ALL_UNITS) return TERMS;
  return TERMS.filter(t => t.unit === unit);
}

export function categoriesForUnit(unit) {
  if (!unit || unit === ALL_UNITS) return CATEGORIES;
  return Array.from(new Set(termsForUnit(unit).map(t => t.cat)));
}

export function pairsForUnit(unit) {
  if (!unit || unit === ALL_UNITS) return CONFUSED_PAIRS;
  const allowed = new Set(termsForUnit(unit).map(t => t.term));
  return CONFUSED_PAIRS.filter(([a, b]) => allowed.has(a) && allowed.has(b));
}

export function keyConceptsForUnit(unit) {
  if (!unit || unit === ALL_UNITS) return KEY_CONCEPTS;
  return KEY_CONCEPTS.filter(k => k.unit === unit);
}
