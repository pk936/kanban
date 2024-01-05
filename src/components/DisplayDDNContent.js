export default function DisplayDDNContent({ show, onChange }) {
  return (
    <div
      className="displ_ddn_Content"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="flex justify-between">
        <label>Grouping</label>
        <Dropdown id="groupBy" onChange={onChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </Dropdown>
      </div>
      <div className="flex justify-between">
        <label>Ordering </label>
        <Dropdown id="orderBy" onChange={onChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
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
