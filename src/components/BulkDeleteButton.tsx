import React from "react";

interface BulkDeleteButtonProps {
  hasCompletedTodos: boolean;
  handleBulkDelete: () => void;
}

const BulkDeleteButton: React.FC<BulkDeleteButtonProps> = ({
  hasCompletedTodos,
  handleBulkDelete,
}) => {
  if (!hasCompletedTodos) return null;

  return (
    <button className="bulkDeleteButton" onClick={handleBulkDelete}>
      完了済みのタスクを一括削除
    </button>
  );
};

export default BulkDeleteButton;
