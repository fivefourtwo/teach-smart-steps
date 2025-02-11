import styles from './Landingpage.module.css';
import '../styles/colors.css';
import '../styles/text-styles.css';

const Landingpage = () => {
  return (
    <div>
      <div className={styles.headerButtons}>
        <div className={styles.signInButton}>
          <div className={styles.signInText}>Sign In</div>
        </div>
        <div className={styles.registerButton}>
          <div className={styles.registerText}>Register</div>
        </div>
      </div>
      <div className={styles.landingContainer}>
        <div className={styles.heroSection}>
          <div className={styles.heroCard}>
            <div className={styles.heroText}>
              <span>Neue Aufgabe zur </span>
              <span style={{ fontWeight: 700 }}>Medienbildung </span>
              <span>erstellen ...</span>
            </div>
          </div>
        </div>
        <div className={styles.featureSection}>
          <div className={styles.featureImage}></div>
          <div className={styles.featureContent}>
            <div className={styles.featureTitle}>Lorem Ipsum</div>
            {/* Continue adding other feature content */}
          </div>
        </div>
        {/* Add additional sections as needed */}
      </div>
    </div>
  );
};

export default Landingpage; 