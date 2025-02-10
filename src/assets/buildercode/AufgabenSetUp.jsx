import styles from './AufgabenSetUp.module.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content-Dauer';
import InfoPopup from './InfoPopup';

function AufgabenSetUp() {
  return (
    <div className={styles.aufgabenSetUp}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <Content />
        <InfoPopup />
      </div>
    </div>
  );
}

export default AufgabenSetUp;