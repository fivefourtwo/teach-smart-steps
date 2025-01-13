// import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import NavButtons from './NavButtons';
import CreateTaskButton from './CreateTaskButton';
import FeatureButton from './FeatureButton';
import VideoSection from './VideoSection';
import FeatureSection from './FeatureSection';
import ExampleSection from './ExampleSection';
import FAQSection from './FAQSection';
import '../../styles/LandingPage.css';

const LandingPage = () => {
//   const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="header">
        <Logo />
        <NavButtons />
      </header>
      
      <main className="main-content">
        <section className="hero-section">
          <CreateTaskButton onClick={() => window.location.href = '/templates/index.html'} />
        </section>
        
        <div className="feature-buttons">
          <FeatureButton title="Erklärung" />
          <FeatureButton title="Beispielaufgaben" />
          <FeatureButton title="FAQ" />
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