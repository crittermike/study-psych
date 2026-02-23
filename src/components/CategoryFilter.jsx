export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="cat-filter">
      <select
        className="cat-select"
        value={selected || ''}
        onChange={(e) => onSelect(e.target.value || null)}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
