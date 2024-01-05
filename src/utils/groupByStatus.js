export default function groupByStatus({ tickets, users }) {
  const groupedTickets = {};
  tickets.forEach((ticket) => {
    const status = ticket.status;
    if (groupedTickets[status]) {
      groupedTickets[status].push(ticket);
    } else {
      groupedTickets[status] = [ticket];
    }
  });

  return groupedTickets;
}
