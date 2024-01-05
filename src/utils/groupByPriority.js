export default function groupByPriority({ tickets, users }) {
  const groupedTickets = {};
  tickets.forEach((ticket) => {
    const priority = ticket.priority;
    if (groupedTickets[priority]) {
      groupedTickets[priority].push(ticket);
    } else {
      groupedTickets[priority] = [ticket];
    }
  });

  return groupedTickets;
}
