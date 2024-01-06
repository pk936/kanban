import Avatar from "./Avatar";
import ColumnHeaderMoreOptions from "./ColumnHeaderMoreOptions";

export default function ColumnHeaderByUser({ label, userName, totalTasks }) {
  return (
    <div className="flex justify-between align-center">
      <div className="flex gap-10 align-center">
        <Avatar userName={userName} />

        <h5 className="text-wrap-no">
          {label}&nbsp;&nbsp;&nbsp;
          <label style={{ color: "#aaa" }}>{totalTasks}</label>
        </h5>
      </div>
      <ColumnHeaderMoreOptions />
    </div>
  );
}
