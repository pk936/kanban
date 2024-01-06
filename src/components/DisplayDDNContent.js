export default function DisplayDDNContent({ show, value, onChange }) {
  const { groupBy, sortBy } = value;

  return (
    <div
      className="displ_ddn_Content"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="flex justify-between">
        <label>Grouping</label>
        <Dropdown id="groupBy" value={groupBy} onChange={onChange}>
          <option value="status">Status</option>
          <option value="userName">User</option>
          <option value="priority">Priority</option>
        </Dropdown>
      </div>
      <div className="flex justify-between">
        <label>Ordering </label>
        <Dropdown id="sortBy" value={sortBy} onChange={onChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </Dropdown>
      </div>
    </div>
  );
}

function Dropdown({ id, children, value, onChange }) {
  return (
    <div className="custom-select">
      <select id={id} onChange={onChange} value={value}>
        {children}
      </select>
    </div>
  );
}
