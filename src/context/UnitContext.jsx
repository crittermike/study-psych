import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  ALL_UNITS,
  UNITS,
  termsForUnit,
  categoriesForUnit,
  pairsForUnit,
  keyConceptsForUnit,
} from '../data/terms';

const STORAGE_KEY = 'active_unit';

const UnitContext = createContext(null);

const ALL_OPTIONS = [ALL_UNITS, ...UNITS];

function readStored() {
  if (typeof window === 'undefined') return ALL_UNITS;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && ALL_OPTIONS.includes(stored)) return stored;
  } catch { /* ignore */ }
  return ALL_UNITS;
}

export function UnitProvider({ children }) {
  const [unit, setUnitState] = useState(readStored);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, unit); } catch { /* ignore */ }
  }, [unit]);

  const value = useMemo(() => {
    const setUnit = (next) => {
      if (ALL_OPTIONS.includes(next)) setUnitState(next);
    };
    const isAllUnits = unit === ALL_UNITS;
    return {
      unit,
      setUnit,
      isAllUnits,
      units: UNITS,
      allUnits: ALL_UNITS,
      terms: termsForUnit(unit),
      categories: categoriesForUnit(unit),
      pairs: pairsForUnit(unit),
      keyConcepts: keyConceptsForUnit(unit),
    };
  }, [unit]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnit must be used inside <UnitProvider>');
  return ctx;
}
