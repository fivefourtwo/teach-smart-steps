import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentAufgabentyp({ formData, handleInputChange }) {
  // Set task type options based on the selected social form.
  let chipOptions = [];

  if (formData.social_form === "Einzelarbeit") {
    chipOptions = [
      "Lückentext ausfüllen",
      "Recherchieren & Notizen machen",
      "Textanalyse & Markierung",
      "Multiple-Choice-Quiz",
      "Storyboard zeichnen",
      "Reflexionsfrage beantworten"
    ];
  } else if (formData.social_form === "Partnerarbeit") {
    chipOptions = [
      "Erklärvideo analysieren",
      "Interview führen",
      "Fehlersuche im Text",
      "Mindmap erstellen",
      "Diskussionskarte ziehen",
      "Schrittweises Erklären"
    ];
  } else if (formData.social_form === "Gruppenarbeit") {
    chipOptions = [
      "Rollenspiel durchführen",
      "Plakat oder Poster gestalten",
      "Erklärungsvideo drehen",
      "Gruppendiskussion mit Pro & Contra",
      "Quiz für die Klasse erstellen",
      "Projektplanung & Aufgabenverteilung"
    ];
  } else if (formData.social_form === "Plenum") {
    chipOptions = [
      "Brainstorming & Ideensammlung",
      "Expert:innen-Runde",
      "Live-Umfrage oder Abstimmung",
      "Erfahrungsberichte teilen",
      "Fishbowl-Diskussion",
      "Kreative Präsentation"
    ];
  }

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
        {/* Render chip buttons based on the selected social form */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${textStyles['body-3-medium']} ${formData.task_type === option ? styles.activeChip : ''}`}
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