import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentAufgabentyp({ formData, handleInputChange }) {
  // Define the chip options for "Aufgabentyp". Adjust the options as needed.
  const chipOptions = [
    "Lückentexte",
    "Zuordnungsaufgaben",
    "Reihenfolgen ordnen",
    "Multiple-Choice-Aufgaben",
    "Freies Schreiben",
    "Mindmaps erstellen",
    "Richtig/Falsch-Aufgaben",
    "Tabellen ausfüllen",
    "Partner- oder Gruppenarbeit",
    "Reflexionsaufgaben"
  ]
  

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Aufgabentyp
          </h1>
          <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              auto fill
            </span>
            <ToggleSwitch onToggle={(isActive) => {
              handleInputChange('task_type', isActive ? "auto fill" : "");
            }} />
          </div>
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Welcher Aufgabentyp soll verwendet werden?
        </p>
        {/* Render chip buttons instead of an input field */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${textStyles['body-3-medium']} ${
                formData.task_type === option ? styles.activeChip : ''
              }`}
              onClick={() => handleInputChange('task_type', option)}
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

ContentAufgabentyp.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentAufgabentyp;