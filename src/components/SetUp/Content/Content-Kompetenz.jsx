import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';

function ContentKompetenz({ formData, handleInputChange }) {
  // Define sample chip options for competency.
  const chipOptions = ['Verstehen', 'Analysieren', 'Kreativ handeln'];

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Kompetenz
          </h1>
          <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              automatisch ausfüllen
            </span>
            <div className={styles.switch} role="switch" aria-checked="false" tabIndex="0" />
          </div>
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          Welche Kompetenz soll mit dieser Aufgabe gefördert werden?
        </p>
        {/* Chip button selection for competency */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
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