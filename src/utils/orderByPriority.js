export default function orderByPriority({ tickets, users }) {
  // const orderedKanbanData = JSON.parse(JSON.stringify(data));

  // for (const key in orderedKanbanData) {
  //   if (
  //     orderedKanbanData.hasOwnProperty(key) &&
  //     Array.isArray(orderedKanbanData[key])
  //   ) {
  //     orderedKanbanData[key].sort((a, b) => a.priority - b.priority);
  //   }
  // }

  // return orderedKanbanData;

  const orderedKanbanData = JSON.parse(JSON.stringify(tickets));
  const newTicket = [];
  orderedKanbanData.map((t) => t.sort((a, b) => a.priority - b.priority));

  return {
    tickets: orderedKanbanData,
    users,
  };
}
