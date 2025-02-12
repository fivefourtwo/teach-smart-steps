import styles from './ParameterInputs.module.css';

const ParameterInputs = ({ type, state, parameter, value, iconSrc, rightIconSrc }) => {
  const getStateClass = () => {
    switch (state) {
      case 'hover':
        return styles.hover;
      case 'selected':
        return styles.selected;
      default:
        return styles.normal;
    }
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

  return (
    <div className={`${styles.parameterInput} ${getStateClass()} ${getTypeClass()}`}>
      <div className={styles.leftSection}>
        <img loading="lazy" src={iconSrc} alt="" className={styles.icon} />
        <div className={styles.parameter}>{parameter}</div>
        {value && <div className={styles.input}>{value}</div>}
      </div>
      <img
        loading="lazy"
        src={rightIconSrc}
        alt=""
        className={`${styles.rightIcon} ${type === 'inputAi' ? styles.aiRightIcon : ''}`}
      />
    </div>
  );
};

export default ParameterInputs;