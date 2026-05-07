// Term factory shared across unit files.
// makeTerm signature: (term, def, cat, blank, example, accept?)
// Each unit file imports `unitFactory` and binds a unit name once,
// so every term gets a `unit` field automatically.

export function makeTerm(unit, term, def, cat, blank, example, accept = []) {
  const withoutParentheses = term.replace(/\s*\([^)]*\)/g, '').trim();
  return {
    term,
    def,
    cat,
    unit,
    blank,
    example,
    accept: [...new Set([term, withoutParentheses, ...accept].filter(Boolean))],
  };
}

export function unitFactory(unitName) {
  return (term, def, cat, blank, example, accept = []) =>
    makeTerm(unitName, term, def, cat, blank, example, accept);
}
