import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import './TaskDetail.css';

const FLASK_SERVER = 'http://127.0.0.1:5000';

const TaskDetail = () => {
  const { sessionId, taskIndex } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${FLASK_SERVER}/get-task/${sessionId}/${taskIndex}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setTask(data.task);
        } else {
          setError(data.error || 'Failed to load task');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to load task. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [sessionId, taskIndex]);

  if (loading) return (
    <div className="task-detail-container">
      <Header />
      <div className="loading">Lade Aufgabe...</div>
    </div>
  );

  if (error) return (
    <div className="task-detail-container">
      <Header />
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Zurück
        </button>
      </div>
    </div>
  );

  return (
    <div className="task-detail-container">
      <Header />
      <div className="task-content">
        <div dangerouslySetInnerHTML={{ __html: task }} />
        <button onClick={() => navigate(-1)} className="back-button">
          Zurück zur Übersicht
        </button>
      </div>
    </div>
  );
};

export default TaskDetail; 