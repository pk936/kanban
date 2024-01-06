import { useEffect, useRef, useState } from "react";
import DisplayDDNContent from "./DisplayDDNContent";

export default function DisplayDropDrown({ value, onChange }) {
  const [openDdn, setOpenDdn] = useState(false);
  const myDivRef = useRef(null);

  function toggleDDN() {
    setOpenDdn(!openDdn);
  }

  const handleClickOutside = (e) => {
    if (myDivRef.current && !myDivRef.current.contains(e.target)) {
      setOpenDdn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="display_ddn">
      <button className="display_ddn_btn" onClick={toggleDDN}>
        <span className="material-icons">tune</span>
        <p>Display</p>
        <span className="material-icons">expand_more</span>
      </button>
      <div ref={myDivRef}>
        <DisplayDDNContent show={openDdn} value={value} onChange={onChange} />
      </div>
    </div>
  );
}
