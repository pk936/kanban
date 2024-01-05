import { useEffect, useRef, useState } from "react";
import "./App.css";
import DisplayDropDrown from "./components/DisplayDropDown";
import KanbanBoard from "./components/KanbanBoard";
import groupByUser from "./utils/groupByUser";
import groupByStatus from "./utils/groupByStatus";
import groupByPriority from "./utils/groupByPriority";
const initialData = { data: null, error: "", loading: false };

function App() {
  const [kanbanData, setKanbanData] = useState(initialData);
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
      initialResponseData.current = jsonData;
      setKanbanData({
        data: groupByStatus(jsonData),
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
    if (e.currentTarget.id === "groupBy") {
      switch (e.target.value) {
        case "status":
          displayData = groupByStatus(initialResponseData.current);
          break;
        case "user":
          displayData = groupByUser(initialResponseData.current);
          break;
        case "prioriy":
          displayData = groupByPriority(initialResponseData.current);
          break;
      }
    } else {
    }

    console.log("displayData", displayData);

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
      <DisplayDropDrown onChange={onChange} />
      <div className="kanbanSection">
        <KanbanBoard tasks={data} onChangeTasks={onChangeData} />
      </div>
    </div>
  );
}

export default App;
