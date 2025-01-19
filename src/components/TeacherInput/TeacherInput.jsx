import { useState } from 'react';
import Header from '../common/Header';
import '../../styles/TeacherInput.css';
import AutoFillButton from '../common/AutoFillButton';

const TeacherInput = () => {
  const [formData, setFormData] = useState({
    grade: '',
    subject: '',
    curriculum_competency: '',
    current_topic: '',
    social_form: '',
    time: '',
    media_competency: '',
    task_format: '',
    student_interests: '',
    digital_tools: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (!formData.grade || !formData.subject || !formData.current_topic) {
      alert('Bitte füllen Sie zuerst die Felder "Klassenstufe", "Fach" und "Aktuelles Thema" aus.');
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
          grade: formData.grade,
          subject: formData.subject,
          current_topic: formData.current_topic
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
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append PDF if exists
      if (pdfFile) {
        formDataToSend.append('pdfFile', pdfFile);
      }

      const response = await fetch('/generate-tasks', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
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
        <h1>Aufgabengenerator für Lehrkräfte</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="grade">Klassenstufe:</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Fach:</label>
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
            <label htmlFor="curriculum_competency">Lehrplankompetenz:</label>
            <input
              type="text"
              id="curriculum_competency"
              name="curriculum_competency"
              value={formData.curriculum_competency}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="current_topic">Aktuelles Thema:</label>
            <input
              type="text"
              id="current_topic"
              name="current_topic"
              value={formData.current_topic}
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
            <label htmlFor="time">Zeit:</label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="media_competency">Medienbildungs-Kompetenz:</label>
            <div className="input-with-suggestion">
              <input
                type="text"
                id="media_competency"
                name="media_competency"
                value={formData.media_competency}
                onChange={handleInputChange}
              />
              <AutoFillButton onClick={() => handleSuggestion('media_competency')} />
            </div>
            <small className="field-hint">
              Klicken Sie auf Vorschlag für eine passende Kompetenz aus dem Lehrplan.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="task_format">Aufgabenformat:</label>
            <div className="input-with-suggestion">
              <input
                type="text"
                id="task_format"
                name="task_format"
                value={formData.task_format}
                onChange={handleInputChange}
              />
              <AutoFillButton onClick={() => handleSuggestion('task_format')} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="student_interests">Interessen der Schüler:</label>
            <input
              type="text"
              id="student_interests"
              name="student_interests"
              value={formData.student_interests}
              onChange={handleInputChange}
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