import styles from './Sidebar.module.css';
import textStyles from '../../../styles/text-styles.module.css';
import ParameterInput from '../ParameterInput/ParameterInput';
import PropTypes from 'prop-types';
import BreadCrumb from '../Breadcrumb/BreadCrumb';

function Sidebar({ activeParameter, setActiveParameter, onGenerate, formData }) {
  const parameters = [
    { icon: "public/Input-icons/normal/Dauer-normal.png", label: "Dauer", type: formData.duration ? "inputUser" : "default", value: formData.duration },
    { icon: "public/Input-icons/normal/Fach-normal.png", label: "Schulfach", type: formData.subject ? "inputUser" : "default", value: formData.subject },
    { icon: "public/Input-icons/normal/Kompetenz-normal.png", label: "Kompetenz", type: formData.competency ? "inputUser" : "default", value: formData.competency },
    { icon: "public/Input-icons/normal/Sozialform-normal.png", label: "Sozialform", type: formData.social_form ? "inputUser" : "default", value: formData.social_form },
    { icon: "public/Input-icons/normal/Aufgabentyp-normal.png", label: "Aufgabentyp", type: formData.task_type ? "inputUser" : "default", value: formData.task_type },
    { icon: "public/Input-icons/normal/Thema-normal.png", label: "Thema", type: formData.topic ? "inputUser" : "default", value: formData.topic },
    { icon: "public/Input-icons/normal/Tools-normal.png", label: "Digitale Tools", type: formData.digital_tools ? "inputUser" : "default", value: formData.digital_tools }
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
  formData: PropTypes.object.isRequired,
};

export default Sidebar;