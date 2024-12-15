type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  handleCategoryAdd: () => void;
  handleCategoryChange: (category: string) => void;
};

const CategoryTabs = ({
  categories,
  activeCategory,
  handleCategoryAdd,
  handleCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="categoryTabsContainer">
      <div className="categoryTabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tabButton ${
              category === activeCategory ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
        <button
          className="addCategoryButton"
          onClick={() => handleCategoryAdd()}
        >
          ＋
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;
