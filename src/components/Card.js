export default function Card({ onDragStart, task, type }) {
  const { id, title, tag, priority } = task;

  return (
    <div
      draggable
      className="card "
      onDragStart={(e) => onDragStart(e, task, type)}
    >
      <div className="flex justify-between align-center">
        <h5>{id}</h5>
        <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg" />
      </div>
      <h5 className="title">{title}</h5>
      <div className="flex gap-10">
        <div className="outlined_box">
          <div>
            <span className="material-icons">priority_high</span>
          </div>
        </div>
        <div className="outlined_box flex align-center gap-2">
          <span className="material-icons">circle</span>
          <small>{tag?.join(" ,")}</small>
        </div>
      </div>
    </div>
  );
}
