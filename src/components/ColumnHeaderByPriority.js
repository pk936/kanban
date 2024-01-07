import ColumnHeaderMoreOptions from "./ColumnHeaderMoreOptions";

export default function ColumnHeaderByPriority({ id, totalTasks }) {
  let icon = null;
  let color = "#6c7077";
  let label = "";

  switch (+id) {
    case 0:
      icon = "more_horiz";
      label = "No Priority";
      break;
    case 1:
      color = "#777";
      icon = "signal_cellular_null";
      label = "Low";
      break;
    case 2:
      color = "#ddd";
      icon = "network_cell";
      label = "Medium";
      break;
    case 3:
      color = "#777";
      icon = "signal_cellular_4_bar";
      label = "High";
      break;
    case 4:
      color = "orange";
      icon = "report";
      label = "Urgent";
      break;
  }

  return (
    <div className="flex justify-between align-center">
      <div className="flex gap-10 align-center">
        <span className="material-icons" style={{ color }}>
          {icon}
        </span>
        <h5 className="text-wrap-no">
          {label}&nbsp;&nbsp;&nbsp;
          <label style={{ color: "#aaa" }}>{totalTasks}</label>
        </h5>
      </div>
      <ColumnHeaderMoreOptions />
    </div>
  );
}
