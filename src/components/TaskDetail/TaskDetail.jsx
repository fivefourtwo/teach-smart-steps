import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Header from '../common/Header';
import './TaskDetail.css';

const TaskDetail = () => {
  const { sessionId, taskIndex } = useParams();
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId === 'direct') {
      // Retrieve generated tasks from localStorage
      const storedTasks = localStorage.getItem('generatedTasks');
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const idx = parseInt(taskIndex, 10);
        if (tasks && tasks.length > idx) {
          setTask(tasks[idx]);
        } else {
          setTask('Aufgabe nicht gefunden.');
        }
      } else {
        setTask('Keine gespeicherten Aufgaben gefunden.');
      }
    } else {
      // Optionally handle other sessionId cases if needed
      setTask('Aufgabe nicht gefunden.');
    }
    setLoading(false);
  }, [sessionId, taskIndex]);

  if (loading)
    return (
      <div className="task-detail-container">
        <Header />
        <div className="loading">Lade Aufgabe...</div>
      </div>
    );

  if (error)
    return (
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
        <ReactMarkdown
          components={{
            h1: ({ props }) => <h1 className="custom-title" {...props} />
          }}
        >
          {task}
        </ReactMarkdown>
        <button onClick={() => navigate(-1)} className="back-button">
          Zurück zur Übersicht
        </button>
      </div>
    </div>
  );
};

export default TaskDetail; 