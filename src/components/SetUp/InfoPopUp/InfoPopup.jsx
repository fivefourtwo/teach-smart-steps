import styles from './InfoPopup.module.css';

const InfoPopup = () => {
  return (
    <div className={styles.infoPopup}>
      <aside className={styles.infoPopup}>
        <div className={styles.popupHeading}>
          <div className={styles.importInfo}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/1e0f2e0d171283f53d08d149538fd4da377a31c32826beab06bce9b62d3654ae?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
              className={styles.importIcon}
              alt=""
            />
            <h3 className={styles.importTitle}>Material-Import</h3>
          </div>
          <button className={styles.closeButton} aria-label="Close info popup">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/098cfa4bfb594f30ae25de94569a5b3f68b93757f0517df5aa6fcb42ebbccfd7?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
              className={styles.closeIcon}
              alt=""
            />
          </button>
        </div>
        <div className={styles.popupBody}>
          <div className={styles.infoContent}>
            <p className={styles.infoText}>
              Die Angaben aus dem Material-Import wurden übernommen! 🎉 <br />
              Passe sie nach Bedarf an.
            </p>
            <p className={styles.infoSubtext}>Thema, Kompetenz, Schulfach</p>
          </div>
          <p className={styles.infoFooter}>nach Upload: Dokument.pdf</p>
        </div>
      </aside>
    </div>
  );
};

export default InfoPopup;