// import styles from './ParameterInput.module.css';
// import textStyles from '../../../styles/text-styles.module.css';
import PropTypes from 'prop-types';

// function ParameterInput({ icon, label, value }) {
//   return (
//     <div className={styles["parameter-input"]}>
//       <div className={styles.buttoninput}>
//         <div className={styles.leftsection}>
//           <div className={styles.icon}>
//             <img
//               src={icon}
//               alt=""
//               className={styles["vector-2-icon"]}
//             />
//           </div>
//           <div className={`${styles.paramter} ${textStyles["body-2-medium"]}`}>
//             {label}
//           </div>
//           {value && (
//             <div className={`${styles.input} ${textStyles["highlight-md-bold"]}`}>
//               {value}
//             </div>
//           )}
//         </div>
//         <div className={styles.badges}>
//           <img
//             src="/public/icons/grey/auto-fill.svg"
//             alt=""
//             className={styles["auto-fill-icon"]}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// ParameterInput.propTypes = {
//   icon: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   value: PropTypes.string,
// };

// ParameterInput.defaultProps = {
//   value: '',
// };

// export default ParameterInput;


import styles from './ParameterInput.module.css';
import { useState } from 'react';

const ParameterInput = ({ type, isSelected, parameter, value, iconSrc }) => {
  const [isHover, setIsHover] = useState(false);
  const getStateClass = () => {
    return isSelected ? styles.selected : isHover ? styles.hover : styles.normal;
  };

  const getTypeClass = () => {
    switch (type) {
      case 'inputUser':
        return styles.inputUser;
      case 'inputAi':
        return styles.inputAi;
      case 'inputDocument':
        return styles.inputDocument;
      default:
        return '';
    }
  };

  const getTypeIconSrc = () => {
    switch (type) {
      case 'inputUser':
        return 'public/badges/Badge-userinput.png';
      case 'inputAi':
        return 'public/badges/Badge-AIinput.png';
      case 'inputDocument':
        return 'public/badges/Badge-documentinput.png';
      default:
        return 'public/badges/Badge-normal.png';
    }
  };

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={`${styles.parameterInput} ${getStateClass()} ${getTypeClass()}`}>
      <div className={styles.leftSection}>
        <img loading="lazy" src={iconSrc} alt="" className={styles.icon} />
        <div className={styles.parameter}>{parameter}</div>
        {value && <div className={styles.input}>{value}</div>}
      </div>
      <img
        loading="lazy"
        src={getTypeIconSrc()}
        alt=""
        className={`${styles.rightIcon} ${type === 'inputAi' ? styles.aiRightIcon : ''}`}
      />
    </div>
  );
};

ParameterInput.propTypes = {
  type: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  parameter: PropTypes.string.isRequired,
  value: PropTypes.string,
  iconSrc: PropTypes.string.isRequired,
  badgeIcon: PropTypes.string.isRequired,
};

ParameterInput.defaultProps = {
  value: '',
};

export default ParameterInput;