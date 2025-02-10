import styles from './AufgabenSetUp.module.css';

function Selector() {
  const durations = ['Ja', 'Nein', 'Teilweise'];

  return (
    <div className={styles.durationSelector}>
      <label className={styles.durationLabel}>Wähle aus ob die Aufgabe mit digitalen Tools bearbeitet werden kann</label>
      <div className={styles.durationButtons}>
        {durations.map((duration, index) => (
          <button key={index} className={styles.durationButton}>{duration}</button>
        ))}
        <button className={styles.addDurationButton} aria-label="Weitere Dauer hinzufügen">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/918868fcfaa902ed8ef9f8fa6e3261b1370ce7ff53e01479a42b8aa52baab6e7?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
            className={styles.addIcon}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Selector;