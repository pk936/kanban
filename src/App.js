import { useEffect, useRef, useState } from "react";
import "./App.css";
import DisplayDropDrown from "./components/DisplayDropDown";
import KanbanBoard from "./components/KanbanBoard";
import { groupSortedTickets } from "./utils";

const initialData = { data: null, error: "", loading: false };

function App() {
  const [kanbanData, setKanbanData] = useState(initialData);
  const [display, setDisplay] = useState({
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

      initialResponseData.current = ticketsWithUsername;
      const groupedByStatusData = groupSortedTickets(
        ticketsWithUsername,
        "status"
      );

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
    let { groupBy, sortBy } = display;
    groupBy = e.currentTarget.id === "groupBy" ? e.target.value : groupBy;
    sortBy = e.currentTarget.id === "sortBy" ? e.target.value : sortBy;
    displayData = groupSortedTickets(
      initialResponseData.current,
      groupBy,
      sortBy
    );

    setDisplay({
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

  if (!data) {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return null;
  }

  console.log("data", data);

  return (
    <div className="App">
      <DisplayDropDrown value={display} onChange={onChange} />
      <div className="kanbanSection">
        <KanbanBoard tasks={data} onChangeTasks={onChangeData} />
      </div>
    </div>
  );
}

export default App;
