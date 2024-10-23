import './board.css';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Nopriority from "../assets/Nopriority.svg";
import dotmenu from "../assets/dotmenu.svg";
import ImgHighPriority from "../assets/ImgHighPriority.svg";
import ImgMediumPriority from "../assets/ImgMediumPriority.svg";
import ImgLowPriority from "../assets/ImgLowPriority.svg";
import SVGUrgentPrioritycolour from "../assets/SVGUrgentPrioritycolour.svg";
import Backlog from "../assets/Backlog.svg";
import Todo from "../assets/Todo.svg";
import Inprogress from "../assets/Inprogress.svg";
import Done from "../assets/Done.svg";
import profileIcon from "../assets/profileIcon.svg";
import Add from "../assets/Add.svg";


const Board = () => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setCards(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupBy = sessionStorage.getItem('groupBy') || 'status';
  const sortBy = sessionStorage.getItem('sortBy') || 'title';

  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  const sortCards = (cards) => {
    return [...cards].sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupCards = (cards) => {
    let grouped = {};
    cards.forEach((card) => {
      let key;
      if (groupBy === 'user') {
        key = userMap[card.userId] || 'Unknown User';
      } else {
        key = card[groupBy];
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(card);
    });
    return grouped;
  };

  const getDisplayTitle = (key) => {
    
    const priority = parseInt(key, 10);
    if (!isNaN(priority)) {
      switch (priority) {
        case 4:
          return 'Urgent';
        case 3:
          return 'High';
        case 2:
          return 'Medium';
        case 1:
          return 'Low';
        case 0:
          return 'No Priority';
        default:
          return priority;
      }
    }
  
    switch (key) {
      case "Todo":
        return "Todo"; 
      case "Inprogress":
        return "In-progress"; 
      case "Backlog":
        return "Backlog"; 
      case "Done":
        return "Done"; 
      default:
        return key; 
    }
  };
  const getDisplayTitleImage=(key)=>{
    const priority = parseInt(key, 10);
    if (!isNaN(priority)) {
      switch (priority) {
        case 4:
          return SVGUrgentPrioritycolour;
        case 3:
          return ImgHighPriority ;
        case 2:
          return ImgMediumPriority;
        case 1:
          return ImgLowPriority ;
        case 0:
          return Nopriority;
        default:
          return profileIcon; 
         
      }
    }
  
    switch (key) {
      case "Todo":
        return Todo; 
      case "In progress":
        return Inprogress; 
      case "Backlog":
        return Backlog; 
      case "Done":
        return Done; 
      default:
        return profileIcon; 
      
    }
  }
  
  if (loading) return <div>Loading...</div>;

  const groupedCards = groupCards(sortCards(cards));


  return (
  <div id="board" className="board-component">
     {Object.keys(groupedCards).map((groupKey) => {
    
    const displayTitle = getDisplayTitle(groupKey); 
    const displayProfile =getDisplayTitleImage(groupKey);

    return (
      <div key={groupKey} className="board-column">
        <div className='board-column-title'>
          <img src= {displayProfile} alt="priority-status" />
          <p>{displayTitle} </p>
          <div className="addoptions">
            <img src= {Add} alt="priority-status" />
            <img src= {dotmenu} alt="priority-status" />
          </div>
        </div>
       
        <div className="card-list">
          {groupedCards[groupKey].map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title} 
              tag={card.tag}
              userid={card.userid}
              status={card.status}
              priority={card.priority}
            />
          ))}
        </div>
      </div>
    );
  })}
    </div>);
};
export default Board;
