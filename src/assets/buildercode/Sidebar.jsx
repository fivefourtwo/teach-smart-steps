import styles from './AufgabenSetUp.module.css';
import ParameterInput from './ParameterInput';

function Sidebar() {
  const parameters = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/3c7ed34051ef45db157b55bae83aabcffd5e2cc0b3870e1cc63ec8360317710a?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Dauer" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/6699f0797a04e86d3e7d395fcc04a53ea5605119cd3148c971c931b630a9e5b4?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Schulfach" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/4baf7de7fa7e34d8ff9c37f70b766745139c52b17b2c4aaddb79a703c919d461?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Kompetenz" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/c1af8b3dddb6691ad9d439260625f05c74646dd0a82b43fbb0b670e4e78601c6?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Sozialform" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/1291e560c436d59b7d7c5504ecbf5a65ca5e15e747ad7f068dab47c36957efba?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Aufgabentyp" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/5ca0ce8fc434757aabb0276824c17df486305f1f87d673ba44e16c6b52bb7ba0?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Thema" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/5484c2eaf7ba7ba6a51ba3a6286b3100fc672ae3a89e85be0bf4db7dce6c64ba?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Digitale Tools" }
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.breadCrumb}>
        <div className={styles.breadCrumbContent}>
          <button className={styles.breadCrumbButton}>Klassenangabe</button>
          <button className={styles.breadCrumbButton}>Startmethode</button>
          <button className={styles.breadCrumbButton}>Material-Import</button>
        </div>
      </nav>
      <div className={styles.sidemenu}>
        <div className={styles.sidemenuText}>
          <h2 className={styles.sidemenuHeading}>
            Setze <span className={styles.highlight}>den Rahmen</span> für deine Aufgabe
          </h2>
          <p className={styles.sidemenuDescription}>
            <span className={styles.bold}>Aufgaben Set Up: </span>
            Auf Basis deines Inputs werden im nächsten Schritt später die Aufgaben generiert.
          </p>
        </div>
        <div className={styles.parameterList}>
          {parameters.map((param, index) => (
            <ParameterInput key={index} icon={param.icon} label={param.label} />
          ))}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/5b310f5ac321769910faf8cb35d3e31ded30b354c3d28df7084e913ff87aa915?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
          className={styles.bottomImage}
          alt=""
        />
      </div>
    </aside>
  );
}

export default Sidebar;