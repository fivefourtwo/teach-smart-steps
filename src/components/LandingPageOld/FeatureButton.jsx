import PropTypes from 'prop-types';

const FeatureButton = ({ title, icon }) => (
  <div className="feature-button">
    <div className="feature-text">{title}</div>
    <div className="feature-icon">{icon}</div>
  </div>
);

FeatureButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node
};

export default FeatureButton;