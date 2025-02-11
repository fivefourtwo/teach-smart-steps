import styles from './AufgabenSetUp.module.css';
import DurationSelector from './DurationSelector';
import StatusIndicator from './StatusIndicator';
import PropTypes from 'prop-types';

function ContentDauer({ formData, handleInputChange }) {
  return (
    <main className={styles.content}>
      <div className={styles.contentWrapper}>
        <div className={styles.head}>
          <h1 className={styles.contentHeading}>Dauer</h1>
          <div className={styles.automaticFillSwitch}>
            <span className={styles.switchLabel}>automatisch ausfüllen</span>
            <div className={styles.switch} role="switch" aria-checked="false" tabIndex="0" />
          </div>
        </div>
        <p className={styles.contentDescription}>
          Wie viel Zeit sollen die Schüler*innen für die Bearbeitung der Aufgabe bekommen?
        </p>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
          required
        />
        <DurationSelector />
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

ContentDauer.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default ContentDauer;