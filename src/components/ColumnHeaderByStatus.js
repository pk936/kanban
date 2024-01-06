import ColumnHeaderMoreOptions from "./ColumnHeaderMoreOptions";

export default function ColumnHeaderByStatus({ label }) {
  let icon = null;
  let color = "#eee";
  switch (label) {
    case "Todo":
      color = "#ddd";
      icon = "circle";
      break;
    case "In progress":
      color = "orange";
      icon = "pending";
      break;
    case "Backlog":
      color = "#000";
      icon = "trip_origin";
      break;
    case "Canceled":
      icon = "cancel";
      break;
  }

  return (
    <div className="flex justify-between align-center">
      <div className="flex gap-10 align-center">
        <span class="material-icons" style={{ color }}>
          {icon}
        </span>
        <h5>{label}</h5>
      </div>
      <ColumnHeaderMoreOptions />
    </div>
  );
}
