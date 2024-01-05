import PriorityColumnHeader from "./ColumnHeaderByPriority";
import ColumnHeaderByStatus from "./ColumnHeaderByStatus";

export default function ColumnConfigHeader({ label }) {
  return (
    <div className="priority_col_header ">
      <ColumnHeaderByStatus label={label} />

      {/* <PriorityColumnHeader /> */}
    </div>
  );
}
