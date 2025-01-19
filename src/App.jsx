import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import PreInput from './components/PreInput/PreInput';
import TeacherInput from './components/TeacherInput/TeacherInput';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<PreInput />} />
        <Route path="/input/teacher" element={<TeacherInput />} />
      </Routes>
    </Router>
  );
}

export default App;
