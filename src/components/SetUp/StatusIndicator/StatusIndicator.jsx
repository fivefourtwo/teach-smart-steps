import styles from './StatusIndicator.module.css';

function StatusIndicator() {
  return (
    <div className={styles.statusIndicator}>
      <div className={styles.statusDescription}>
        <div className={styles.statusHeading}>
          <div className={styles.liveIcon}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/9887d1805e3f9a51299fa7a86fb09821662f477f497d1057dd92996d2524010f?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
              className={styles.statusIcon}
              alt=""
            />
          </div>
          <h2 className={styles.statusTitle}>Status deiner Aufgabe</h2>
        </div>
        <p className={styles.statusText}>
          Da einige Parameter offen sind, können die Aufgaben variieren. Falls du gezieltere Vorschläge möchtest, ergänze weitere Angaben.
        </p>
      </div>
      <div className={styles.statusGraph}>
        <div className={styles.statusCurve}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/a6b24dafccdc1f78d42a3c60460126addda35918afba349b5b855d0652cd2a53?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
            className={styles.curveImage}
            alt="Status curve graph"
          />
        </div>
        <div className={styles.statusLabels}>
          <span className={styles.leftLabel}>hohe Varianz</span>
          <span className={styles.rightLabel}>sehr gezielt</span>
        </div>
      </div>
    </div>
  );
}

export default StatusIndicator;