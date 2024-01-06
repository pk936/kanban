export default function orderByTitle(data) {
  const orderedKanbanData = JSON.parse(JSON.stringify(data));

  for (const key in orderedKanbanData) {
    if (
      orderedKanbanData.hasOwnProperty(key) &&
      Array.isArray(orderedKanbanData[key])
    ) {
      orderedKanbanData[key].sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  return orderedKanbanData;
}
