import ColumnHeaderByPriority from "./ColumnHeaderByPriority";
import ColumnHeaderByStatus from "./ColumnHeaderByStatus";
import ColumnHeaderByUser from "./ColumnHeaderByUser";

export default function ColumnConfigHeader({
  groupBy,
  userName,
  totalTasks,
  label,
}) {
  let header = null;
  switch (groupBy) {
    case "status":
      header = <ColumnHeaderByStatus label={label} />;
      break;
    case "priority":
      header = <ColumnHeaderByPriority id={label} totalTasks={totalTasks} />;
      break;
    default:
      header = (
        <ColumnHeaderByUser
          label={label}
          totalTasks={totalTasks}
          userName={userName}
        />
      );
  }
  return <div className="priority_col_header ">{header}</div>;
}
