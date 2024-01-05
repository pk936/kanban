import { useState } from "react";
import Card from "./Card";
import ColumnConfigHeader from "./ColumnConfigHeader";

const KanbanBoard = ({ tasks, onChangeTasks }) => {
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
    const taskString = e.dataTransfer.getData("task");
    const task = JSON.parse(taskString);
    const originalStatus = e.dataTransfer.getData("status");

    if (originalStatus !== status) {
      const updatedTasks = { ...tasks };
      const index = updatedTasks[originalStatus].indexOf(task);
      updatedTasks[originalStatus].splice(index, 1);
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
          <ColumnConfigHeader label={key} />
          {element.map((task, index) => (
            <Card
              key={index}
              type={key}
              task={task}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      );
    }
  }

  return <div className="flex justify-around flex-wrap">{columns}</div>;
};

export default KanbanBoard;
