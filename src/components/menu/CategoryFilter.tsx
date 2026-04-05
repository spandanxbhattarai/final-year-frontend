interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selected === ''
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === cat
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
