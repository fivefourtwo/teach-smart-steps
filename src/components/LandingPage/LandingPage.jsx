import { useNavigate } from 'react-router-dom';
import VideoSection from './VideoSection';
import FeatureSection from './FeatureSection';
import ExampleSection from './ExampleSection';
import FAQSection from './FAQSection';
import '../../styles/LandingPage.css';
import '../../styles/buttons.css';
import Header from '../common/Header';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateTask = () => {
    navigate('/input');
  };

  return (
    <div className="landing-container">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <button className="create-task-btn" onClick={handleCreateTask}>
            <div className="create-task-btn-inner">
              <div className="create-task-btn-text">
                <span className="regular">Neue Aufgabe zur</span><br />
                <span className="bold">Medienbildung</span><br />
                <span className="regular">erstellen ...</span>
              </div>
            </div>
          </button>
        </section>
        
        <div className="feature-buttons">
          <button className="btn-secondary">Erklärung</button>
          <button className="btn-secondary">Beispielaufgaben</button>
          <button className="btn-secondary">FAQ</button>
        </div>

        <VideoSection />
        <FeatureSection />
        <div className="divider" />
        <ExampleSection />
        <div className="divider" />
        <FAQSection />
      </main>
    </div>
  );
};

export default LandingPage; 