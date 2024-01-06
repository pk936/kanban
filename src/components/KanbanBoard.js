import { useState } from "react";
import Card from "./Card";
import ColumnConfigHeader from "./ColumnConfigHeader";

const KanbanBoard = ({ tasks, groupBy, onChangeTasks }) => {
  //   const [tasks, setTasks] = useState(data);
  const columns = [];

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
      updatedTasks[status].push(task);
      onChangeTasks(updatedTasks);
    }
  };

  for (const key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      const element = tasks[key];
      columns.push(
        <div
          key={key}
          className="kanban-column"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, key)}
        >
          <ColumnConfigHeader
            label={key}
            totalTasks={element.length}
            groupBy={groupBy}
            userName={element[0].userName}
          />
          {element.map((task) => (
            <Card
              key={task.id}
              type={key}
              task={task}
              onDragStart={handleDragStart}
              groupBy={groupBy}
            />
          ))}
        </div>
      );
    }
  }

  return columns;

  // return <div className="flex justify-around flex-wrap">{columns}</div>;
};

export default KanbanBoard;
