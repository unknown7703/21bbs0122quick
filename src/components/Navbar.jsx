import "./navbar.css";
import React, { useState } from 'react';
import  Display from '../assets/Display.svg';
import  Down from '../assets/Down.svg';
const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);
  const handleGroupChange = (e) => {
    const groupBy = e.target.value;
    sessionStorage.setItem('groupBy', groupBy);
    window.location.reload(); // Force re-rendering
  };

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    sessionStorage.setItem('sortBy', sortBy);
    window.location.reload(); // Force re-rendering
  };

  const groupBy = sessionStorage.getItem('groupBy') || 'status';
  const sortBy = sessionStorage.getItem('sortBy') || 'title';


  return (
    <div className="navbar">
      <button className="display-button" onClick={togglePopup}>
        <img src={Display} alt="display-logo" />
        Display
        <img src={Down} alt="down-logo" />
      </button>
      {showPopup && (
        <div className="popup-content">
          <div className="popup-select">
            <label>Grouping </label>
            <select value={groupBy}  onChange={handleGroupChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="popup-select">
            <label>Ordering </label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
