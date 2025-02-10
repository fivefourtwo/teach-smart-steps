import styles from './AufgabenSetUp.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.figurativeMark}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/722dd938b58d9044b7aab679e7145fab6a915e4099c7283454cb08ede931ed6f?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
            className={styles.logoImage}
            alt="Teach Smart Steps logo"
          />
        </div>
        <div className={styles.wordmark}>
          Teach <br />
          <span className={styles.highlight}>Smart Steps</span>
        </div>
      </div>
      <div className={styles.headerAuth}>
        <button className={styles.generateTaskButton}>
          <div className={styles.buttonIndicator} />
          <span>Aufgabe erstellen</span>
        </button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/1cdae4bd1c58826a9987b9cbe4d4c51cb69e61678e618539a1ecbd2c08be7430?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
          className={styles.divider}
          alt=""
        />
        <div className={styles.general}>
          <button className={styles.settingsButton} aria-label="Settings" />
          <button className={styles.profileButton} aria-label="Profile">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/1d2a45dab9e3a532000f7b9f4f0a04100d3d12302b987d8cbf3b373c36ab8311?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
              className={styles.profileImage}
              alt="User profile"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;