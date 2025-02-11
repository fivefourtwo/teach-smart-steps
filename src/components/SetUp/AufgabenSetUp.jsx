import styles from './AufgabenSetUp.module.css';
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AufgabenSetUp() {
  const [formData, setFormData] = useState({
    duration: '',
    subject: '',
    competency: '',
    social_form: '',
    task_type: '',
    topic: '',
    digital_tools: ''
  });
  
  const [activeParameter, setActiveParameter] = useState("Dauer");
  
  const navigate = useNavigate();
  
  // A unified change handler that can be passed into your content components so that they update formData:
  const handleInputChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // A submit handler similar to TeacherInput.jsx:
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build your form data (you can include file uploads if needed)
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    // (Include any additional files as needed)
    // Now make the fetch call
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
  
  // Choose which content component to render based on activeParameter:
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
        <Sidebar activeParameter={activeParameter} setActiveParameter={setActiveParameter} />
        <form onSubmit={handleSubmit}>
          {renderContent()}
          <button type="submit">Aufgaben generieren</button>
        </form>
        <InfoPopup />
      </div>
    </div>
  );
}

export default AufgabenSetUp;