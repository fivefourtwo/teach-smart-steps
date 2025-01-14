import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import TaskGenerator from './components/TaskGenerator/TaskGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/task-generator" element={<TaskGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
