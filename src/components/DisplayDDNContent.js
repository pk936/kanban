export default function DisplayDDNContent({ show, value, onChange }) {
  return (
    <div
      className="displ_ddn_Content"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="flex justify-between">
        <label>Grouping</label>
        <Dropdown id="groupBy" onChange={onChange}>
          <option selected={value === "status"} value="status">
            Status
          </option>
          <option selected={value === "userName"} value="userName">
            User
          </option>
          <option selected={value === "priority"} value="priority">
            Priority
          </option>
        </Dropdown>
      </div>
      <div className="flex justify-between">
        <label>Ordering </label>
        <Dropdown id="sortBy" onChange={onChange}>
          <option selected={value === "priority"} value="priority">
            Priority
          </option>
          <option selected={value === "title"} value="title">
            Title
          </option>
        </Dropdown>
      </div>
    </div>
  );
}

function Dropdown({ id, children, onChange }) {
  return (
    <div className="custom-select">
      <select id={id} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}
