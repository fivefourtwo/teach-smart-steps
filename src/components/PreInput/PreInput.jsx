import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import '../../styles/PreInput.css';
import '../../styles/buttons.css';

const PreInput = () => {
  const navigate = useNavigate();

  const handlePythonApp = () => {
    navigate('/setup');
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrapper">
        <svg width="1168" height="668" viewBox="0 0 1168 668" style={{ background: 'transparent' }}>
        <g transform="translate(360, 100)">
          <path d="M207.81 154.662V154.682L207.811 154.703C208.877 180.723 219.682 205.457 238.169 223.945C257.663 243.439 284.103 254.39 311.672 254.39H357.235C359.892 254.39 362.525 254.491 365.131 254.689L365.169 254.691H365.207H416.256C440.31 254.691 459.81 274.191 459.81 298.245V348.351V348.394L459.813 348.436C460.065 351.373 460.194 354.346 460.194 357.349C460.194 360.352 460.065 363.324 459.813 366.261L459.81 366.304V366.346V416.754C459.81 440.808 440.31 460.307 416.256 460.307H297.748C273.694 460.307 254.194 440.808 254.194 416.754V307.651V307.631L254.193 307.611C253.147 281.559 242.339 256.791 223.831 238.283C204.337 218.788 177.898 207.837 150.329 207.837H104.765C101.234 207.837 97.7449 207.659 94.306 207.312L94.256 207.307H94.2057H45.7477C21.6937 207.307 2.19409 187.808 2.19409 163.754V113.917V113.874L2.1904 113.831C1.93633 110.881 1.80664 107.895 1.80664 104.878C1.80664 101.862 1.93633 98.8761 2.1904 95.926L2.19409 95.8831V95.8402V45.245C2.19409 21.191 21.6937 1.69141 45.7477 1.69141H164.256C188.31 1.69141 207.81 21.191 207.81 45.245V154.662Z" 
                stroke="#FA4604" 
                strokeWidth="2"
                fill="transparent"/>
          
          <foreignObject x="18" y="40" width="180" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" className="choice-card">
              <h2 className="choice-title">
                <span className="orange-text">Ich will meine</span><br />
                <span className="orange-text">Anforderungen erstmal</span><br />
                <span className="blue-text">konkretisieren.</span>
              </h2>
              <button className="btn-secondary" onClick={handlePythonApp}>
                Start <span className="x-icon">×</span>
              </button>
            </div>
          </foreignObject>

          <image
            className="preview-popup top-left"
            href="/steps-preview.svg"
            x="250"
            y="-40"
            width="500"
            // height="400"
          />

          <foreignObject x="270" y="300" width="180" height="150">
            <div xmlns="http://www.w3.org/1999/xhtml" className="choice-card">
              <h2 className="choice-title">
                <span className="orange-text">Erstelle mir</span>
                <span className="blue-text"> direkt mal</span><br />
                <span className="orange-text">eine Aufgabe.</span>
              </h2>
              <button className="btn-secondary">
                Start <span className="x-icon">×</span>
              </button>
            </div>
          </foreignObject>

          <image
            className="preview-popup bottom-right"
            href="/editor-preview.svg"
            x="-300"
            y="300"
            width="500"
            // height="200"
          />
        </g>
        </svg>
      </div>
    </div>
  );
};

export default PreInput; 