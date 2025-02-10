import { useState } from 'react';
import Header from '../common/Header';
import '../../styles/TeacherInput.css';
import AutoFillButton from '../common/AutoFillButton';
import { useNavigate } from 'react-router-dom';

const TeacherInput = () => {
  const [formData, setFormData] = useState({
    duration: '',
    subject: '',
    competency: '',
    social_form: '',
    task_type: '',
    topic: '',
    digital_tools: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSuggestion = async (field) => {
    if (!formData.duration || !formData.subject || !formData.topic) {
      alert('Bitte füllen Sie zuerst die Felder "Dauer", "Fach" und "Thema" aus.');
      return;
    }

    try {
      const response = await fetch('/generate-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field,
          duration: formData.duration,
          subject: formData.subject,
          topic: formData.topic
        })
      });

      const data = await response.json();
      if (data.suggestion) {
        setFormData(prev => ({
          ...prev,
          [field]: data.suggestion
        }));
      }
    } catch (error) {
      alert('Fehler beim Generieren des Vorschlags: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      if (pdfFile) {
        formDataToSend.append('pdfFile', pdfFile);
      }

      console.log(formDataToSend);

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
        setResult({ 
          success: false, 
          error: data.error 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ 
        success: false, 
        error: `Fehler bei der Verarbeitung: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="container">
        <h1>Lehrer-Input</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="duration">Dauer:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Schulfach:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdfFile">Dokument (PDF):</label>
            <input
              type="file"
              id="pdfFile"
              name="pdfFile"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="competency">Kompetenz:</label>
            <input
              type="text"
              id="competency"
              name="competency"
              value={formData.competency}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="social_form">Sozialform:</label>
            <div className="input-with-suggestion">
              <input
                type="text"
                id="social_form"
                name="social_form"
                value={formData.social_form}
                onChange={handleInputChange}
                required
              />
              <AutoFillButton onClick={() => handleSuggestion('social_form')} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task_type">Aufgabentyp:</label>
            <div className="input-with-suggestion">
              <input
                type="text"
                id="task_type"
                name="task_type"
                value={formData.task_type}
                onChange={handleInputChange}
                required
              />
              <AutoFillButton onClick={() => handleSuggestion('task_type')} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="topic">Thema:</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="digital_tools">Digitale Tools:</label>
            <div className="input-with-suggestion">
              <input
                type="text"
                id="digital_tools"
                name="digital_tools"
                value={formData.digital_tools}
                onChange={handleInputChange}
              />
              <AutoFillButton onClick={() => handleSuggestion('digital_tools')} />
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Generiere Aufgaben...' : 'Aufgaben generieren'}
          </button>
        </form>

        {result && (
          <div className="result-container">
            {result.success ? (
              <>
                {result.pdf_info?.processed && (
                  <div className="pdf-info">
                    <h4>PDF Informationen:</h4>
                    <p>Dateiname: {result.pdf_info.filename}</p>
                    <p>Anzahl Seiten: {result.pdf_info.page_count}</p>
                    <p>Zeichen extrahiert: {result.pdf_info.char_count}</p>
                    <details>
                      <summary>PDF Inhalt Vorschau</summary>
                      <pre className="pdf-preview">{result.pdf_text}</pre>
                    </details>
                  </div>
                )}
                <h3>Generierte Aufgaben:</h3>
                <div dangerouslySetInnerHTML={{ __html: result.tasks }} />
                <p><small>Generiert am: {result.timestamp}</small></p>
              </>
            ) : (
              <p className="error">Fehler: {result.error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherInput; 