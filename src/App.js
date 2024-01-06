import { useEffect, useRef, useState } from "react";
import "./App.css";
import DisplayDropDrown from "./components/DisplayDropDown";
import KanbanBoard from "./components/KanbanBoard";
import { groupSortedTickets, sortTicketsInGroups } from "./utils";

const initialData = { data: null, error: "", loading: false };

function App() {
  const [kanbanData, setKanbanData] = useState(initialData);
  const [view, setView] = useState({
    groupBy: "status",
    sortBy: "priority",
  });
  const initialResponseData = useRef();

  async function fetchData() {
    setKanbanData({ ...initialData, loading: true });

    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      // add user name on each ticket
      const ticketsWithUsername = jsonData.tickets.map((ticket) => {
        const user = jsonData.users.find((user) => user.id === ticket.userId);
        return { ...ticket, userName: user ? user.name : "Unknown User" };
      });

      setData(ticketsWithUsername);
    } catch (error) {
      console.log(error);
      setKanbanData({ ...initialData, error, loading: false });
    }
  }

  // set final data from api call or localstoraage
  function setData(data) {
    const { groupBy, sortBy } =
      JSON.parse(localStorage.getItem("view")) || view;

    initialResponseData.current = data;
    const groupedByStatusData = groupSortedTickets(data, groupBy, sortBy);

    setView({ groupBy, sortBy });
    setKanbanData({
      data: groupedByStatusData,
      error: "",
      loading: false,
    });
  }

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("kanban"));
    if (data) {
      setData(data);
    } else {
      fetchData();
    }
  }, []);

  function onChangeView(e) {
    let displayData;
    let { groupBy, sortBy } = view;
    groupBy = e.currentTarget.id === "groupBy" ? e.target.value : groupBy;
    sortBy = e.currentTarget.id === "sortBy" ? e.target.value : sortBy;
    localStorage.setItem("view", JSON.stringify({ groupBy, sortBy }));

    displayData = groupSortedTickets(
      initialResponseData.current,
      groupBy,
      sortBy
    );

    setView({
      groupBy,
      sortBy,
    });

    setKanbanData({
      ...kanbanData,
      data: displayData,
    });
  }

  function onChangeData(data) {
    let { sortBy } = view;
    const displayData = sortTicketsInGroups(data, sortBy);

    setKanbanData({
      ...kanbanData,
      data: displayData,
    });

    const flatData = Object.values(data).flat();
    initialResponseData.current = flatData;

    localStorage.setItem("kanban", JSON.stringify(flatData));
  }

  const { data, error, loading } = kanbanData;
  const { groupBy } = view;

  if (!data) {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return null;
  }

  return (
    <div className="App">
      <DisplayDropDrown value={view} onChange={onChangeView} />
      <div className="kanbanSection">
        <KanbanBoard
          tasks={data}
          groupBy={groupBy}
          onChangeTasks={onChangeData}
        />
      </div>
    </div>
  );
}

export default App;
