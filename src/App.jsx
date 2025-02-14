import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPageOld/LandingPage';
import MaterialImport from './components/Material-import/MaterialImport';
// import TeacherInput from './components/TeacherInput/TeacherInput';
import TaskSummaries from './components/TaskSummaries/TaskSummaries';
import TaskDetail from './components/TaskDetail/TaskDetail';
import AufgabenSetUp from './components/SetUp/AufgabenSetUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<MaterialImport />} />
        {/* <Route path="/input/teacher" element={<TeacherInput />} /> */}
        <Route path="/task-summaries" element={<TaskSummaries />} />
        <Route path="/task/:sessionId/:taskIndex" element={<TaskDetail />} />
        <Route path="/setup" element={<AufgabenSetUp />} />
      </Routes>
    </Router>
  );
}

export default App;
