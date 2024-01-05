import ColumnHeaderMoreOptions from "./ColumnHeaderMoreOptions";

export default function ColumnHeaderByStatus({ label }) {
  return (
    <div className="flex justify-between align-center">
      <div className="flex gap-10 align-center">
        <span class="material-icons">circle</span>
        <h5>{label}</h5>
      </div>
      <ColumnHeaderMoreOptions />
    </div>
  );
}
