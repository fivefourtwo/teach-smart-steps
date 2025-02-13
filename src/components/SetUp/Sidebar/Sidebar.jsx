import styles from './Sidebar.module.css';
import textStyles from '../../../styles/text-styles.module.css';
import ParameterInput from '../ParameterInput/ParameterInput';
import PropTypes from 'prop-types';
import BreadCrumb from '../Breadcrumb/BreadCrumb';

function Sidebar({ activeParameter, setActiveParameter }) {
  const parameters = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/3c7ed34051ef45db157b55bae83aabcffd5e2cc0b3870e1cc63ec8360317710a?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Dauer", type: "inputUser", value: "10 Minuten" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/6699f0797a04e86d3e7d395fcc04a53ea5605119cd3148c971c931b630a9e5b4?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Schulfach", type: "inputUser", value: "Mathe" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/4baf7de7fa7e34d8ff9c37f70b766745139c52b17b2c4aaddb79a703c919d461?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Kompetenz", type: "inputAi", value: "Sprache und Sprachgebrauch" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/c1af8b3dddb6691ad9d439260625f05c74646dd0a82b43fbb0b670e4e78601c6?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Sozialform", type: "inputAi", value: "Gruppenarbeit" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/1291e560c436d59b7d7c5504ecbf5a65ca5e15e747ad7f068dab47c36957efba?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Aufgabentyp", type: "inputUser", value: "Lückentext" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/5ca0ce8fc434757aabb0276824c17df486305f1f87d673ba44e16c6b52bb7ba0?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Thema", type: "inputDocument", value: "Freundschaft" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/5484c2eaf7ba7ba6a51ba3a6286b3100fc672ae3a89e85be0bf4db7dce6c64ba?apiKey=7da5ffe85d6946038bc7fd898fe05285&", label: "Digitale Tools", type: "inputDocument", value: "Ohne Tools" }
  ];

  return (
    <aside className={styles.sidebar}>
      <BreadCrumb />
      <div className={styles.sidemenu}>
        <div className={styles.sidemenuText}>
          <h2 className={textStyles['heading-1-semibold']}>
            Setze <span className={styles.highlight}>den Rahmen</span> für deine Aufgabe
          </h2>
          <p className={`${styles.sidemenuDescription} ${textStyles['body-2-medium']}`}>
            <span className={textStyles['body-2-medium']}>Aufgaben Set Up: </span>
            Auf Basis deines Inputs werden im nächsten Schritt später die Aufgaben generiert.
          </p>
        </div>
        <div className={styles.parameterList}>
          <div className={styles.parameterListWrapper}>
            {parameters.map((param, index) => (
                <ParameterInput 
                type={param.type}
                isSelected={activeParameter === param.label} 
                parameter={param.label} 
                value={param.value}
                iconSrc={param.icon}
                setActiveParameter={setActiveParameter}
                key={index}
                />
            ))}
          </div>
          <button type="submit" className={`${styles.generateButton} ${textStyles['body-2-medium']}`}>
            <img
              className={styles.iconGenerate}
              src="public/icons/white/Generate.svg"
              alt="erstellen-icon"
            />
            <span className={styles.erstellen}>Erstellen</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  activeParameter: PropTypes.string.isRequired,
  setActiveParameter: PropTypes.func.isRequired,
};

export default Sidebar;