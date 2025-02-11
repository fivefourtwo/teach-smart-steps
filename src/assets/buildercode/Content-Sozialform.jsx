import styles from './AufgabenSetUp.module.css';
import StatusIndicator from './StatusIndicator';
import PropTypes from 'prop-types';

function ContentSozialform({ formData, handleInputChange }) {
  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={styles.contentHeading}>Sozialform</h1>
          <div className={styles.automaticFillSwitch}>
            <span className={styles.switchLabel}>automatisch ausfüllen</span>
            <div className={styles.switch} role="switch" aria-checked="false" tabIndex="0" />
          </div>
        </div>
        <p className={styles.contentDescription}>
          In welcher Sozialform soll die Aufgabe bearbeitet werden?
        </p>
        <input
          type="text"
          value={formData.social_form}
          onChange={(e) => handleInputChange('social_form', e.target.value)}
          required
        />
        <button className={styles.explainButton}>
          <span>Erklär mir das</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/7ca9387f59d8e77286d5ccde1bb9838c6b8ba7ad1d205aebc8a50f34820c0a76?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
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