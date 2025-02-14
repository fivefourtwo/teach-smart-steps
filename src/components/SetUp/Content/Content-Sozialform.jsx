import styles from './Content.module.css';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import PropTypes from 'prop-types';
import textStyles from '../../../styles/text-styles.module.css';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';

function ContentSozialform({ formData, handleInputChange }) {
  // Define sample chip options for social forms.
  const chipOptions = ['Einzelarbeit', 'Partnerarbeit', 'Gruppenarbeit', 'Plenum'];

  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={`${styles.contentHeading} ${textStyles['heading-1-semibold']}`}>
            Sozialform
          </h1>
          <div className={styles.automaticFillSwitch}>
            <span className={`${styles.switchLabel} ${textStyles['body-2-medium']}`}>
              auto fill
            </span>
            <ToggleSwitch onToggle={(isActive) => {
              handleInputChange('social_form', isActive ? "auto fill" : "");
            }} />
          </div>
        </div>
        <p className={`${styles.contentDescription} ${textStyles['heading-2-medium']}`}>
          In welcher Sozialform soll die Aufgabe bearbeitet werden?
        </p>
        {/* Chip button selection for social form */}
        <div className={styles.chips}>
          {chipOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.chipButton} ${formData.social_form === option ? styles.activeChip : ''}`}
              onClick={() => handleInputChange('social_form', option)}
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

ContentSozialform.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentSozialform;