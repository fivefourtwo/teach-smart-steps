// import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../common/Header';
import './TaskSummaries.css';

const TaskSummaries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { summaries, sessionId } = location.state;

  const handleTaskClick = (index) => {
    navigate(`/task/${sessionId}/${index}`);
  };

  return (
    <div className="summaries-container">
      <Header />
      <h1>Generierte Aufgaben</h1>
      <div className="summaries-grid">
        {summaries.map((summary, index) => (
          <div 
            key={index} 
            className="summary-card"
            onClick={() => handleTaskClick(index)}
          >
            <h2>Aufgabe {index + 1}</h2>
            <p>{summary}</p>
            <button className="view-task-btn">
              Aufgabe ansehen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSummaries; 