const ExampleSection = () => (
  <div className="example-section">
    <div className="example-header">
      <div className="example-button">
        <div className="button-text">Beispielaufgaben</div>
        <div className="button-icon"></div>
      </div>
    </div>
    
    <div className="example-content">
      <div className="example-image"></div>
      <div className="example-details">
        <div className="example-title">Medienbildung Einführungseinheit</div>
        <div className="example-info">
          <div className="info-item">Dauer: Lorem Ipsum</div>
          <div className="info-item">Material: Lorem Ipsum</div>
          <div className="info-item">Unterrichtsphase: Lorem Ipsum</div>
        </div>
      </div>
    </div>
    
    <button className="discover-more">
      <span>Mehr Entdecken</span>
      <div className="arrow-icon"></div>
    </button>
  </div>
);

export default ExampleSection; 