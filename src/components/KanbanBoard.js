import Columns from "./Columns";

const KanbanBoard = ({ tasks, groupBy, columns, onChangeTasks }) => {
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

export default KanbanBoard;
