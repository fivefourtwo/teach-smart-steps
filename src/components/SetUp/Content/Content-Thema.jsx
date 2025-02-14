import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentThema({ formData, handleInputChange }) {
  // Define sample topics. Adjust these options as needed.
  const chipOptions = ['Kultur', 'Wissenschaft', 'Sport', 'Technik'];

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Thema
          </h1>
          <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              auto fill
            </span>
            <ToggleSwitch onToggle={(isActive) => {
              handleInputChange('topic', isActive ? "auto fill" : "");
            }} />
          </div>
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Zu welchem Thema soll die Aufgabe erstellt werden?
        </p>
        {/* Chip button selection for "Thema" */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${formData.topic === option ? styles.activeChip : ''}`}
              onClick={() => handleInputChange('topic', option)}
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

ContentThema.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentThema;