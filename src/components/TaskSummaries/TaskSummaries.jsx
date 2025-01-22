// import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../common/Header';
import TaskPreview from '../common/TaskPreview';
import './TaskSummaries.css';

const TaskSummaries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { summaries, sessionId } = location.state;

  const handleTaskClick = (index) => {
    navigate(`/task/${sessionId}/${index}`);
  };

  // Parse summaries if they're strings
  const parsedSummaries = summaries.map(summary => 
    typeof summary === 'string' ? JSON.parse(summary) : summary
  );

  return (
    <div className="summaries-container">
      <Header />
      <div className="summaries-grid">
        {parsedSummaries.map((summary, index) => (
          <TaskPreview
            key={index}
            data={summary}
            onClick={() => handleTaskClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskSummaries; 