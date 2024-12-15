type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onAddCategory: (newCategory: string) => void;
  onCategorySelect: (category: string) => void;
};

const CategoryTabs = ({
  categories,
  activeCategory,
  onAddCategory,
  onCategorySelect,
}: CategoryTabsProps) => {
  const handleAddCategory = () => {
    const newCategory = prompt("新しいカテゴリを入力してください");
    if (newCategory && !categories.includes(newCategory)) {
      onAddCategory(newCategory);
    }
  };
  return (
    <div className="categoryTabs">
      {categories.map((category) => (
        <button
          key={category}
          className={`tabButton ${category === activeCategory ? "active" : ""}`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
      <button className="addCategoryButton" onClick={handleAddCategory}>
        ＋
      </button>
    </div>
  );
};

export default CategoryTabs;
