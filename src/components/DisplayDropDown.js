import { useState } from "react";
import DisplayDDNContent from "./DisplayDDNContent";

export default function DisplayDropDrown({ onChange }) {
  const [openDdn, setOpenDdn] = useState(false);

  function toggleDDN() {
    setOpenDdn(!openDdn);
  }

  return (
    <div className="display_ddn">
      <button className="display_ddn_btn" onClick={toggleDDN}>
        <span class="material-icons">tune</span>
        <span>Display</span>
        <span class="material-icons">expand_more</span>
      </button>
      <DisplayDDNContent show={openDdn} onChange={onChange} />
    </div>
  );
}
