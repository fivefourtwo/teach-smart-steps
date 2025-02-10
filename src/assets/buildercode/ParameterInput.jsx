import styles from './AufgabenSetUp.module.css';
import PropTypes from 'prop-types';

function ParameterInput({ icon, label }) {
  return (
    <div className={styles.parameterInput}>
      <div className={styles.sozialformSetup}>
        <div className={styles.inputLabel}>
          <div className={styles.iconWrapper}>
            <img
              loading="lazy"
              src={icon}
              className={styles.parameterIcon}
              alt=""
            />
          </div>
          <div className={styles.parameterLabel}>{label}</div>
        </div>
        <div className={styles.badges} />
      </div>
    </div>
  );
}

ParameterInput.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ParameterInput;