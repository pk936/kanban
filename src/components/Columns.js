import Card from "./Card";
import ColumnConfigHeader from "./ColumnConfigHeader";

export default function Columns({
  columns,
  groupBy,
  tasks,
  onDragOver,
  onDragStart,
  onDrop,
}) {
  const statusColumn = columns[groupBy].map((col) => {
    return (
      <div
        key={col}
        className="kanban-column"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, col)}
      >
        <ColumnConfigHeader
          label={col}
          totalTasks={tasks[col]?.length || 0}
          groupBy={groupBy}
        />

        {tasks[col]?.map((task) => (
          <Card
            key={task.id}
            type={col}
            task={task}
            onDragStart={onDragStart}
            groupBy={groupBy}
          />
        ))}
      </div>
    );
  });

  return statusColumn;
}
