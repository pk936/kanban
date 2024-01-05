export default function groupByUser({ tickets, users }) {
  const groupedTickets = {};
  tickets.forEach((ticket) => {
    const userId = ticket.userId;
    if (groupedTickets[userId]) {
      groupedTickets[userId].push({ ...ticket, ...getUserData(users, userId) });
    } else {
      groupedTickets[userId] = [{ ...ticket, ...getUserData(users, userId) }];
    }
  });

  return groupedTickets;
}

function getUserData(users, userId) {
  return users.find(({ id }) => userId === id) || {};
}
