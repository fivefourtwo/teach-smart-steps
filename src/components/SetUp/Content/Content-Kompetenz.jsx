import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
// import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentKompetenz({ formData, handleInputChange }) {
  // Determine competency chip options based on the selected school subject
  let chipOptions = [];
  
  if (formData.subject === "Deutsch") {
    chipOptions = [
      "Mit Texten und anderen Medien umgehen",
      "Sprache und Sprachgebrauch untersuchen",
      "Präsentieren",
      "Leseverstehen entwickeln",
      "Texte verfassen – richtig schreiben"
    ];
  } else if (formData.subject === "Sachunterricht") {
    chipOptions = [
      "Demokratie und Gesellschaft",
      "Natur und Leben",
      "Naturphänomene und Technik",
      "Raum und Mobilität",
      "Zeit und Wandel",
      "Experimente"
    ];
  } else if (formData.subject === "Religion") {
    chipOptions = [
      "Mensch, Welt und Verantwortung",
      "Bibel",
      "Gott",
      "Jesus Christus",
      "Kirche und Kirchen",
      "Religionen"
    ];
  } else {
    chipOptions = ['Verstehen', 'Analysieren', 'Kreativ handeln'];
  }

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Kompetenz
          </h1>
          {/* <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              auto fill
            </span>
            <ToggleSwitch />
          </div> */}
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Welche Kompetenz soll mit dieser Aufgabe gefördert werden?
        </p>
        {/* Chip button selection for competency */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${formData.competency === option ? styles.activeChip : ''}`}
              onClick={() => handleInputChange('competency', option)}
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

ContentKompetenz.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentKompetenz;