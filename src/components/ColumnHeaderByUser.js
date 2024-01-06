import ColumnHeaderMoreOptions from "./ColumnHeaderMoreOptions";

export default function ColumnHeaderByUser({ label, totalTasks }) {
  return (
    <div className="flex justify-between align-center">
      <div className="flex gap-10 align-center">
        <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg" />

        <h5>
          {label}&nbsp;&nbsp;&nbsp;
          <label style={{ color: "#aaa" }}>{totalTasks}</label>
        </h5>
      </div>
      <ColumnHeaderMoreOptions />
    </div>
  );
}
