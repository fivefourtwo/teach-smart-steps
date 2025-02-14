import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
// import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentDauer({ formData, handleInputChange }) {
  // Define duration options as chips.
  const chipOptions = ['15 Minuten', '30 Minuten', '45 Minuten', '60 Minuten'];

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Dauer
          </h1>
          {/* <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              auto fill
            </span>
            <ToggleSwitch />
          </div> */}
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Wie viel Zeit sollen die Schüler*innen für die Bearbeitung der Aufgabe bekommen?
        </p>
        {/* Chip button selection for duration */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${formData.duration === option ? styles.activeChip : ''}`}
              onClick={() => handleInputChange('duration', option)}
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

ContentDauer.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentDauer;