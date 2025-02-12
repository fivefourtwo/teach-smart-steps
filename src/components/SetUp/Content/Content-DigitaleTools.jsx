import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';

function ContentDigitaleTools({ formData, handleInputChange }) {
  // Define sample chip options for digital tools.
  const chipOptions = ['Ohne Tools', 'Mit Tools', 'Nicht relevant'];

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Digitale Tools
          </h1>
          <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              automatisch ausfüllen
            </span>
            <div className={styles.switch} role="switch" aria-checked="false" tabIndex="0" />
          </div>
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Haben die Schüler:innen Zugang zu digitalen Tools?
        </p>
        {/* Chip button selection for digital tools */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              className={`${styles.chipButton} ${formData.digital_tools === option ? styles.activeChip : ''}`}
              onClick={() => handleInputChange('digital_tools', option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button className={styles.explainButton}>
          <span className={`${styles.explainButtonText} ${textStyles['body-2-medium']}`}>
            Erklär mir das
          </span>
          <img
            loading="lazy"
            src="/public/icons/grey/help.svg"
            className={styles.explainIcon}
            alt=""
          />
        </button>
      </div>
      <StatusIndicator />
    </main>
  );
}

ContentDigitaleTools.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentDigitaleTools;