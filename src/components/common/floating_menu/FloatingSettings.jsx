import { useState } from "react";
import "./FloatingSettings.css";

const FloatingSettings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAutoFillActive, setIsAutoFillActive] = useState(true); // Example state

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleAutoFill = () => {
    setIsAutoFillActive(!isAutoFillActive);
  };

  return (
    <div className="floating-settings">
      <div className="floating-settings-header">
        <div className="header-buttons">
          <div className="home-icon">
            <img src="/icons/home.svg" alt="Toggle Settings" />
          </div>
          <div className={`floating-header-content ${isCollapsed ? 'collapsed' : ''}`}>
            <span className="frau-lehrerin">Frau Lehrerin:</span>
            <span className="ausgedachte-grundschule">
              3b • Ausgedachte Grundschule
            </span>
          </div>
          <div className="toogle-button" onClick={toggleCollapse}>
            <img src="/icons/thumbnail_bar.svg" alt="Toggle Settings" />
          </div>
        </div>
      </div>
      {!isCollapsed && (
        <div className="floating-settings-content">
          <div className="floating-settings-grade">
            <b className="content-heading">Ihre Klassen</b>
            <div className="grade-content">
              <div className="background"/>

              <div className="klasse-3b">Klasse 3b</div>
              <img className="more-icon" alt="" src="/public/icons/more.svg" />
            </div>
          </div>
          {/* Settings Option 1 */}
          <div className="floating-settings-settings-container">
            <b className="content-heading">Einstellungen</b>
            <div className="floating-settings-settings">
            {/* Settings Option 2 */}
                <div className="switch-container">
                    <div className="switch-text">
                    Auto-Fill für alle Felder ohne Eingabe
                    </div>
                    <div
                    className={`radio-empty-icon ${
                        isAutoFillActive ? "active" : ""
                    }`}
                    onClick={toggleAutoFill}
                    >
                    <div className="switch-button-inner"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSettings;
