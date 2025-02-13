import styles from './Sidebar.module.css';
import textStyles from '../../../styles/text-styles.module.css';
import ParameterInput from '../ParameterInput/ParameterInput';
import PropTypes from 'prop-types';
import BreadCrumb from '../Breadcrumb/BreadCrumb';

function Sidebar({ activeParameter, setActiveParameter, onGenerate }) {
  const parameters = [
    { icon: "public/Input-icons/normal/Dauer-normal.png", label: "Dauer", type: "deafult", value: "10 Minuten" },
    { icon: "public/Input-icons/normal/Fach-normal.png", label: "Schulfach", type: "deafult", value: "Mathe" },
    { icon: "public/Input-icons/normal/Kompetenz-normal.png", label: "Kompetenz", type: "deafult", value: "Sprache und Sprachgebrauch" },
    { icon: "public/Input-icons/normal/Sozialform-normal.png", label: "Sozialform", type: "deafult", value: "Gruppenarbeit" },
    { icon: "public/Input-icons/normal/Aufgabentyp-normal.png", label: "Aufgabentyp", type: "deafult", value: "Lückentext" },
    { icon: "public/Input-icons/normal/Thema-normal.png", label: "Thema", type: "deafult", value: "Freundschaft" },
    { icon: "public/Input-icons/normal/Tools-normal.png", label: "Digitale Tools", type: "deafult", value: "Ohne Tools" }
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
          <button 
            type="button" 
            onClick={onGenerate} 
            className={`${styles.generateButton} ${textStyles['body-2-medium']}`}
          >
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
  onGenerate: PropTypes.func.isRequired,
};

export default Sidebar;