const FeatureSection = () => {
  const features = [
    {
      title: "Lorem Ipsum",
      description: "Sed urna massa adipiscing egestas accumsan aliquet mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincid..."
    },
    {
      title: "Lorem Ipsum",
      description: "Sed urna massa adipiscing egestas accumsan aliquet mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincid..."
    },
    {
      title: "Lorem Ipsum",
      description: "Sed urna massa adipiscing egestas accumsan aliquet mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincid..."
    }
  ];

  return (
    <div className="feature-section">
      <div className="section-title">Feature Erklärung</div>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <div className="feature-image"></div>
            <div className="feature-content">
              <div className="feature-title">{feature.title}</div>
              <div className="feature-description">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection; 