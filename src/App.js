import { useEffect, useRef, useState } from "react";
import "./App.css";
import DisplayDropDrown from "./components/DisplayDropDown";
import KanbanBoard from "./components/KanbanBoard";
import { groupSortedTickets } from "./utils";

const initialData = { data: null, error: "", loading: false };

function App() {
  const [kanbanData, setKanbanData] = useState(initialData);
  const [view, setView] = useState({
    groupBy: "status",
    sortBy: "priority",
  });
  const initialResponseData = useRef();

  async function fetchData(params) {
    setKanbanData({ ...initialData, loading: true });

    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      const ticketsWithUsername = jsonData.tickets.map((ticket) => {
        const user = jsonData.users.find((user) => user.id === ticket.userId);
        return { ...ticket, userName: user ? user.name : "Unknown User" };
      });

      const { groupBy, sortBy } = JSON.parse(localStorage.getItem("view"));

      initialResponseData.current = ticketsWithUsername;
      const groupedByStatusData = groupSortedTickets(
        ticketsWithUsername,
        groupBy
      );

      setView({ groupBy, sortBy });
      setKanbanData({
        data: groupedByStatusData,
        error: "",
        loading: false,
      });
    } catch (error) {
      console.log(error);
      setKanbanData({ ...initialData, error, loading: false });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onChange(e) {
    let displayData;
    let { groupBy, sortBy } = view;
    groupBy = e.currentTarget.id === "groupBy" ? e.target.value : groupBy;
    sortBy = e.currentTarget.id === "sortBy" ? e.target.value : sortBy;
    displayData = groupSortedTickets(
      initialResponseData.current,
      groupBy,
      sortBy
    );

    localStorage.setItem("view", JSON.stringify({ groupBy, sortBy }));

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
    setKanbanData({
      ...kanbanData,
      data,
    });
  }

  const { data, error, loading } = kanbanData;
  console.log("data", data, error, loading);

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
      <DisplayDropDrown value={view} onChange={onChange} />
      <div className="kanbanSection">
        <KanbanBoard tasks={data} onChangeTasks={onChangeData} />
      </div>
    </div>
  );
}

export default App;
