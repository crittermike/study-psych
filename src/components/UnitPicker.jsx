import { UNITS, ALL_UNITS } from '../data/terms';
import { useUnit } from '../context/UnitContext';

export default function UnitPicker() {
  const { unit, setUnit, terms } = useUnit();
  return (
    <div className="unit-picker">
      <span className="up-label">📖 Studying</span>
      <select
        className="up-select"
        value={unit}
        onChange={e => setUnit(e.target.value)}
        aria-label="Select unit to study"
      >
        <option value={ALL_UNITS}>📚 All Units (Final Exam Mix)</option>
        {UNITS.map(u => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>
      <span className="up-count">{terms.length} terms</span>
    </div>
  );
}
