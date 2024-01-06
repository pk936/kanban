import { useState } from "react";
import Card from "./Card";
import ColumnConfigHeader from "./ColumnConfigHeader";

const KanbanBoard = ({ tasks, groupBy, columns, onChangeTasks }) => {
  //   const [tasks, setTasks] = useState(data);
  const columnList = [];

  const handleDragStart = (e, task, status) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("status", status);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskString = e.dataTransfer.getData("task");
    const task = JSON.parse(taskString);
    const originalStatus = e.dataTransfer.getData("status");

    if (originalStatus !== status) {
      const updatedTasks = JSON.parse(JSON.stringify(tasks));
      const index = updatedTasks[originalStatus].findIndex(
        (t) => t.id === task.id
      );

      updatedTasks[originalStatus].splice(index, 1);
      task[groupBy] = status;
      if (updatedTasks[status]) {
        updatedTasks[status].push(task);
      } else {
        updatedTasks[status] = [task];
      }
      onChangeTasks(updatedTasks);
    }
  };

  return (
    <Columns
      columns={columns}
      groupBy={groupBy}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      tasks={tasks}
    />
  );
};

function Columns({ columns, groupBy, tasks, onDragOver, onDragStart, onDrop }) {
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
          // userName={tasks[col]?.[0]?.userName}
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

export default KanbanBoard;
