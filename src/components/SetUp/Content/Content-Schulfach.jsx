import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
// import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentSchulfach({ formData, handleInputChange }) {
  // Define sample chip options for school subjects.
  const chipOptions = ['Deutsch', 'Sachunterricht', 'Religion', 'Englisch'];

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Schulfach
          </h1>
          {/* <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              auto fill
            </span>
            <ToggleSwitch />
          </div> */}
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Für welches Schulfach soll die Aufgabe erstellt werden?
        </p>
        {/* Chip button selection for school subject */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${formData.subject === option ? styles.activeChip : ''}`}
              onClick={() => handleInputChange('subject', option)}
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

ContentSchulfach.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentSchulfach;