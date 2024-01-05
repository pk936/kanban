import ColumnHeaderMoreOptions from "./ColumnHeaderMoreOptions";

export default function ColumnHeaderByPriority(params) {
  return (
    <div className="flex justify-between align-center">
      <div className="flex gap-10 align-center">
        <span class="material-icons">more_horiz</span>
        <h5>No Priority 2</h5>
      </div>
      <ColumnHeaderMoreOptions />
    </div>
  );
}
