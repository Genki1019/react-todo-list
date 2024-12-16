import { DragEvent, MouseEvent } from "react";
import { DEFAULT_CATEGORIES } from "./types/constants";

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  handleCategoryAdd: () => void;
  handleCategoryChange: (category: string) => void;
  handleCategoryDelete: (categoryToDelete: string) => void;
  handleCategoryReorder: (sourceIndex: number, targetIndex: number) => void;
};

const CategoryTabs = ({
  categories,
  activeCategory,
  handleCategoryAdd,
  handleCategoryChange,
  handleCategoryDelete,
  handleCategoryReorder,
}: CategoryTabsProps) => {
  const handleContextMenu = (e: MouseEvent, category: string) => {
    e.preventDefault();
    if (category === DEFAULT_CATEGORIES[0]) {
      alert("カテゴリAllは削除できません");
      return;
    }
    if (window.confirm(`カテゴリ${category}を削除しますか？`)) {
      handleCategoryDelete(category);
    }
  };

  const handleDragStart = (e: DragEvent, index: number) => {
    e.dataTransfer.setData("categoryIndex", index.toString());
  };

  const handleDrop = (e: DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("categoryIndex"), 10);
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      handleCategoryReorder(sourceIndex, targetIndex);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="categoryTabsContainer">
      <div className="categoryTabs">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`tabButton ${
              category === activeCategory ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
            onContextMenu={(e) => handleContextMenu(e, category)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
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
