import PropTypes from 'prop-types';

const AutoFillButton = ({ onClick, disabled }) => (
  <button
    type="button"
    className="auto-fill-btn"
    onClick={onClick}
    disabled={disabled}
  >
    <div className="auto-fill-btn-content">
      <img 
        src="/auto-fill-icon.svg" 
        alt="Auto fill"
        className="auto-fill-icon"
      />
      <span>Auto-Fill</span>
    </div>
  </button>
);

AutoFillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default AutoFillButton; 