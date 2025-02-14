import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BreadCrumb.module.css';
import textStyles from '../../../styles/text-styles.module.css';

function BreadCrumb() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPreSetup = location.pathname === '/pre-setup';

  const handleMaterialImportClick = () => {
    navigate('/pre-setup');
  };

  return (
    <nav className={styles.breadCrumb}>
      <div className={styles.homeCrumb}>
        <img src="/public/icons/black/home.svg" alt="Home" className={styles.homeIcon} />
      </div>
      {/* <div className={styles.separator}>
        <img src="/public/icons/black/Chevron-right.svg" alt="Chevron Right" className={styles.chevronIcon} />
      </div> */}
      {/* <button className={`${styles.breadCrumbButton} ${textStyles['body-2-medium']}`}>
        Klassenangabe
      </button> */}
      <div className={styles.separator}>
        <img src="/public/icons/black/Chevron-right.svg" alt="Chevron Right" className={styles.chevronIcon} />
      </div>
      <button 
        className={`${styles.breadCrumbButton} ${textStyles['body-2-medium']}`}
        onClick={handleMaterialImportClick}
      >
        Material-Import
      </button>
      {!isPreSetup && (
        <>
          <div className={styles.separator}>
            <img src="/public/icons/black/Chevron-right.svg" alt="Chevron Right" className={styles.chevronIcon} />
          </div>
          <button className={`${styles.breadCrumbButton} ${textStyles['body-2-medium']}`}>
            Setup
          </button>
        </>
      )}
    </nav>
  );
}

export default BreadCrumb; 