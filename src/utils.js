function groupBy(data, property) {
  return data.reduce((result, item) => {
    const key = item[property];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
}

function sortBy(data, property) {
  if (property === "priority") {
    return data.sort((a, b) => a[property] - b[property]);
  }

  return data.sort((a, b) => a[property].localeCompare(b[property]));
}

export function sortTicketsInGroups(data, property) {
  let obj = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      obj[key] = sortBy(element, property);
    }
  }

  return obj;
}

export function groupSortedTickets(data, groupByProp, sortByProp = "priority") {
  let result = groupBy(data, groupByProp);
  result = sortTicketsInGroups(result, sortByProp);
  return result;
}
