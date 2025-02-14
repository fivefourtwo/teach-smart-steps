import styles from './AufgabenSetUp.module.css';
// import textStyles from '../../styles/text-styles.module.css';
import Header from '/src/components/common/Header';
import Sidebar from './Sidebar/Sidebar';
import InfoPopup from './InfoPopUp/InfoPopup';
import ContentDauer from './Content/Content-Dauer';
import ContentSchulfach from './Content/Content-Schulfach';
import ContentKompetenz from './Content/Content-Kompetenz';
import ContentSozialform from './Content/Content-Sozialform';
import ContentAufgabentyp from './Content/Content-Aufgabentyp';
import ContentThema from './Content/Content-Thema';
import ContentDigitaleTools from './Content/Content-DigitaleTools';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AufgabenSetUp() {
  const location = useLocation();
  const initialFormData = {
    duration: '',
    subject: '',
    competency: '',
    social_form: '',
    task_type: '',
    topic: '',
    digital_tools: ''
  };

  // Pre-fill the form if a material selection was passed
  if (location.state) {
    initialFormData.subject = location.state.subject || initialFormData.subject;
    initialFormData.topic = location.state.topic || initialFormData.topic;
    initialFormData.competency = location.state.competency || initialFormData.competency;
  }
  
  const [formData, setFormData] = useState(initialFormData);
  const [activeParameter, setActiveParameter] = useState("Dauer");
  const navigate = useNavigate();
  
  // A unified change handler for updating formData from the content components.
  const handleInputChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // This useEffect logs formData every time it changes.
  useEffect(() => {
    console.log('Current formData:', formData);
  }, [formData]);

  // Modified submit handler.
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    // Build form data for the API call.
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    try {
      const response = await fetch('/generate-tasks', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      
      if (data.success) {
        navigate('/task-summaries', { 
          state: { 
            summaries: data.summaries,
            sessionId: data.session_id
          }
        });
      } else {
        console.error("Error:", data.error);
      }
    } catch (err) {
      console.error("Error submitting tasks:", err);
    }
  };
  
  // Choose which content component to render based on activeParameter.
  const renderContent = () => {
    switch (activeParameter) {
      case "Dauer":
        return <ContentDauer formData={formData} handleInputChange={handleInputChange} />;
      case "Schulfach":
        return <ContentSchulfach formData={formData} handleInputChange={handleInputChange} />;
      case "Kompetenz":
        return <ContentKompetenz formData={formData} handleInputChange={handleInputChange} />;
      case "Sozialform":
        return <ContentSozialform formData={formData} handleInputChange={handleInputChange} />;
      case "Aufgabentyp":
        return <ContentAufgabentyp formData={formData} handleInputChange={handleInputChange} />;
      case "Thema":
        return <ContentThema formData={formData} handleInputChange={handleInputChange} />;
      case "Digitale Tools":
        return <ContentDigitaleTools formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.aufgabenSetUp}>
      <Header />
      <div className={styles.body}>
        <Sidebar 
          activeParameter={activeParameter} 
          setActiveParameter={setActiveParameter} 
          onGenerate={handleSubmit}
          formData={formData}
        />
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {renderContent()}
          {/* Form submission is also accessible via the enter key */}
        </form>
        <InfoPopup />
      </div>
    </div>
  );
}

export default AufgabenSetUp;