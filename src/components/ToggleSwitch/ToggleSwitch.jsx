import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ToggleSwitch.module.css';

function ToggleSwitch({ onToggle, initialState = false, isControlled = false }) {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    if (isControlled) {
      setIsActive(initialState);
    }
  }, [initialState, isControlled]);

  const toggleSwitch = () => {
    setIsActive((prev) => {
      const newState = !prev;
      if (onToggle) onToggle(newState);
      return newState;
    });
  };

  return (
    <div
      role="switch"
      tabIndex="0"
      aria-checked={isActive}
      className={`${styles.switch} ${isActive ? styles.active : ''}`}
      onClick={toggleSwitch}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleSwitch();
          e.preventDefault();
        }
      }}>
        <div className={styles.handle} />
    </div>
  );
}

ToggleSwitch.propTypes = {
  onToggle: PropTypes.func,
  initialState: PropTypes.bool,
  isControlled: PropTypes.bool,
};

export default ToggleSwitch; 