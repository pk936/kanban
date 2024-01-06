import Avatar from "./Avatar";

export default function Card({ groupBy, onDragStart, task, type }) {
  const { id, title, tag, priority, userName } = task;

  let icon = null;
  let color = "#6c7077";

  switch (+priority) {
    case 0:
      icon = "more_horiz";
      break;
    case 1:
      color = "orange";
      icon = "report";
      break;
    case 2:
      color = "#777";
      icon = "signal_cellular_4_bar";
      break;
    case 3:
      color = "#ddd";
      icon = "network_cell";
      break;
    case 4:
      color = "#777";
      icon = "signal_cellular_null";
      break;
  }

  return (
    <div
      draggable
      className="card "
      onDragStart={(e) => onDragStart(e, task, type)}
    >
      <div className="flex justify-between align-center">
        <p className="taskId">{id}</p>
        {groupBy !== "userName" && <Avatar userName={userName} />}
      </div>
      <div className="flex gap-2">
        {groupBy !== "status" && (
          <span
            className="material-icons"
            style={{ color: "#aaa", fontSize: 16 }}
          >
            motion_photos_on
          </span>
        )}
        <h5 className="title">{title}</h5>
      </div>
      <div className="flex gap-2">
        {groupBy !== "priority" && (
          <div className="outlined_box">
            <span className="material-icons" style={{ color }}>
              {icon}
            </span>
          </div>
        )}

        {tag.length > 0 && (
          <div className="outlined_box flex align-center gap-2">
            <span className="material-icons">circle</span>
            <small className="tags">{tag?.join(" ,")}</small>
          </div>
        )}
      </div>
    </div>
  );
}
