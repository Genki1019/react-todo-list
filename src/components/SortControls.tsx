import { SortOrder } from "../types/index";

type SortControlsProps = {
  sortOrder: SortOrder;
  handleSortOrderChange: (sortOrder: SortOrder) => void;
};

const SortControls = ({
  sortOrder,
  handleSortOrderChange,
}: SortControlsProps) => {
  return (
    <div className="sortControls">
      <label htmlFor="sortOrder">ソート順：</label>
      <select
        id="sortOrder"
        className="SortPullDownMenu"
        value={sortOrder}
        onChange={(e) =>
          handleSortOrderChange(e.target.value as typeof sortOrder)
        }
      >
        <option value={SortOrder.CREATED_ASC}>登録の新しい順</option>
        <option value={SortOrder.CREATED_DESC}>登録の古い順</option>
        <option value={SortOrder.DEADLINE_ASC}>期限の近い順</option>
        <option value={SortOrder.DEADLINE_DESC}>期限の遠い順</option>
      </select>
    </div>
  );
};

export default SortControls;
