import styles from './TaskPreview.module.css';
import PropTypes from 'prop-types';

const TaskPreview = ({ data, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.previewCard}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerText}>{data.grade}</div>
            <div className={styles.headerText}>{data.date}</div> {/* get date from timestampq */}
          </div>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.subtitle}>{data.subtitle}</div>
        </div>
        
        <div className={styles.description}>
          <div className={styles.descriptionText}>
            {data.description}
          </div>
        </div>
            <div className={styles.infoRowContainer}>
                <InfoRow label="Zeit:" value={data.time} icon="zeit.svg" />
                <InfoRow label="Sozialform:" value={data.socialForm} icon="sozialform.svg" />
                <InfoRow label="Aufgabentyp:" value={data.taskType} icon="aufgabentyp.svg" />
                <InfoRow label="Tools:" value={data.tools} icon="tools.svg" />
                <InfoRow label="Schulfach:" value={data.subject} isBlack icon="schulfach.svg" />
            </div>

            <div className={styles.actionButton}>
              <div className={styles.buttonInner}>
                <img src="/public/icons/zoom.svg" alt="zoom-icon" className={styles.zoomIcon} />
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    const InfoRow = ({ label, value, isBlack, icon }) => {
      const textClass = isBlack ? styles.blackText : styles.labelText;
      const valueClass = `${styles.valueText} ${isBlack ? styles.blackText : ''}`;
    
      return (
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>
            <img src={`/public/icons/${icon}`} alt={`${label.toLowerCase()}-icon`} className={styles.icon} />
            <div className={textClass}>{label}</div>
          </div>
          <div className={valueClass}>{value}</div>
        </div>
      );
    };

TaskPreview.propTypes = {
  data: PropTypes.shape({
    grade: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    socialForm: PropTypes.string.isRequired,
    taskType: PropTypes.string.isRequired,
    tools: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isBlack: PropTypes.bool,
  icon: PropTypes.string.isRequired
};

InfoRow.defaultProps = {
  isBlack: false
};

export default TaskPreview;