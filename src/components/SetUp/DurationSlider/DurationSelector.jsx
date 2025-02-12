import styles from './DurationSelector.module.css';
import textStyles from '../../../styles/text-styles.module.css';

function DurationSelector() {
  const durations = ['15 Minuten', '30 Minuten', '45 Minuten', '60 Minuten'];

  return (
    <div className={styles.durationSelector}>
      <label className={`${styles.durationLabel} ${textStyles['body-2-medium']}`}>
        Wähle die Dauer
      </label>
      <div className={styles.chips}>
        {durations.map((duration, index) => (
          <button key={index} className={`${styles.chipButton} ${textStyles['body-3-medium']}`}>
            {duration}
          </button>
        ))}
        <button className={styles.addChipButton} aria-label="Weitere Dauer hinzufügen">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/918868fcfaa902ed8ef9f8fa6e3261b1370ce7ff53e01479a42b8aa52baab6e7?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
            className={styles.addIcon}
            alt=""
          />
        </button>
      </div>
      <div className={styles.durationSlider}>
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderThumb}
            tabIndex="0"
            role="slider"
            aria-valuemin="10"
            aria-valuemax="180"
            aria-valuenow="30"
          />
        </div>
        <div className={styles.sliderLabels}>
          <span className={textStyles['note-medium']}>10 Minuten</span>
          <span className={textStyles['note-medium']}>180 Minuten</span>
        </div>
      </div>
    </div>
  );
}

export default DurationSelector;