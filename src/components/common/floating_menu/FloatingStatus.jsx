import { useState } from 'react';
import './FloatingStatus.css';

const FloatingStatus = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="floating-status">
        
      <div className="floating-status-header">
        <div className="status-icon">
          <img src="/icons/status.svg" alt="status-icon" />
        </div>
        <div className="status-header-text">Status deiner Aufgabe</div>
          <div className="status-toggle-button" onClick={toggleCollapse}>
            <img src="/icons/thumbnail_bar.svg" alt="Toggle Status" />
          </div>
      </div>

      {!isCollapsed && (
        <div className="status-section">
          {/* Add your expandable status content here */}
          {/* Example status parameters */}
          <div className="status-parameter">
            <span>Variationsbreite</span>
            <span>0,25</span>
          </div>
          <div className="status-slider">
            <div className="active-bar"></div>
            <div className="inactive-bar"></div>
            <div className="dot active" style={{ left: '54.17px', top: '5.15px' }}></div>
            <div className="dot inactive" style={{ left: '102.85px', top: '5.15px' }}></div>
            <div className="dot inactive" style={{ left: '151.52px', top: '5.15px' }}></div>
            <div className="dot active" style={{ left: '5.49px', top: '5.15px' }}></div>
            <div className="dot inactive" style={{ left: '200.2px', top: '5.15px' }}></div>
          </div>
          {/* Add more status parameters as needed */}
        </div>
      )}
    </div>
  );
};

export default FloatingStatus;