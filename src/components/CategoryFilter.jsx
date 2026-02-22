export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="cat-filter">
      <button className={`cat-pill${!selected ? ' active' : ''}`} onClick={() => onSelect(null)}>All</button>
      {categories.map(cat => (
        <button key={cat} className={`cat-pill${selected === cat ? ' active' : ''}`} onClick={() => onSelect(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
