import styles from './Header.module.css';
import textStyles from '../../styles/text-styles.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.figurativeMark}>
          <img
            loading="lazy"
            src="/public/smart-steps-logo.svg"
            className={styles.logoImage}
            alt="Teach Smart Steps logo"
          />
        </div>
        <div className={`${styles.wordmark} ${textStyles['body-2-bold']}`}>
          Teach <br />
          <span className={styles.highlight}>Smart Steps</span>
        </div>
      </div>
      <div className={styles.headerAuth}>
        <button className={styles.generateTaskButton}>
          <div className={styles.buttonIndicator} />
          <span className={textStyles['body-2-medium']}>Aufgabe erstellen</span>
        </button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/1cdae4bd1c58826a9987b9cbe4d4c51cb69e61678e618539a1ecbd2c08be7430?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
          className={styles.divider}
          alt=""
        />
        <div className={styles.general}>
          <button className={styles.settingsButton} aria-label="Settings">
            <img
              loading="lazy"
              src="/public/icons/black/Settings.svg"
              className={styles.settingsImage}
              alt="User profile"
            />
          </button>
          <button className={styles.profileButton} aria-label="Profile">
            <img
              loading="lazy"
              src="/public/profile.png"
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