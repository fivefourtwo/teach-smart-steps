import styles from './MaterialImport.module.css';
import Header from '/src/components/common/Header';
import BreadCrumb from '../SetUp/Breadcrumb/BreadCrumb';
import GradeSelection from './GradeSelection/GradeSelection';
import MaterialUpload from './MaterialUpload/MaterialUpload';

function MaterialImport() {
  return (
    <div className={styles.materialImport}>
      <Header />
      <div className={styles.body}>
        <BreadCrumb />
        <div className={styles.preSetUpNew}>
          <GradeSelection />
          <MaterialUpload />
        </div>
      </div>
    </div>
  );
}

export default MaterialImport;