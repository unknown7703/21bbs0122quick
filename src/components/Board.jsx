import './board.css';
import React, { useState, useEffect } from 'react';
import Card from './Card';
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
    // Check if the key is a number (for priority)
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
          return priority; // Return the priority value itself if not in the cases
      }
    }
  
    // If the key is not a number, treat it as a status string
    switch (key) {
      case "Todo":
        return "Todo"; // Replace with your actual Todo icon or string
      case "Inprogress":
        return "In-progress"; // Replace with your actual Inprogress icon or string
      case "Backlog":
        return "Backlog"; // Replace with your actual Backlog icon or string
      case "Done":
        return "Done"; // Replace with your actual Done icon or string
      default:
        return key; // Return the status itself if it doesn't match any case
    }
  };
  
  if (loading) return <div>Loading...</div>;

  const groupedCards = groupCards(sortCards(cards));


  return (
  <div id="board" className="board-component">
     {Object.keys(groupedCards).map((groupKey) => {
    
    const displayTitle = getDisplayTitle(groupKey); // Get display title for either priority or status


    return (
      <div key={groupKey} className="board-column">
        <div className='board-column-title'>
          {displayTitle} 
        </div>
        <div className="card-list">
          {groupedCards[groupKey].map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title} // Keep the original card title
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
