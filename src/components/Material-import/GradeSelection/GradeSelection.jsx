import styles from '../MaterialImport.module.css';
import { useState } from 'react';
function GradeSelection() {
  const [grades, setGrades] = useState([
    { id: '4b', label: 'Klasse: 4b', selected: false },
    { id: '3a', label: 'Klasse: 3a', selected: true },
  ]);

  const handleGradeChange = (selectedId) => {
    setGrades((prevGrades) =>
      prevGrades.map((grade) => ({
        ...grade,
        selected: grade.id === selectedId,
      }))
    );
  };

  return (
    <section className={styles.grade}>
      <h1 className={styles.heading}>
        Für welche <span className={styles.highlight}>Klasse</span> soll die Aufgabe sein?
      </h1>
      <div className={styles.gradeForm}>
        <div className={styles.container}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/ad4d8f05be5e024a82a3b4053da0de31071db1bb3a06f8355ff783469c1fb09e?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
            className={styles.gradeIcon}
            alt=""
          />
          <div className={styles.contentWrapper}>
            <div className={styles.textWrapper}>
              <h2 className={styles.formTitle}>
                Deine Klassen – einfach auswählen!
              </h2>
              <p className={styles.formDescription}>
                Wähle eine bestehende Klasse für deine neue Aufgabe.
              </p>
            </div>
            <div className={styles.selectionWrapper}>
              {grades.map((grade) => (
                <label
                  key={grade.id}
                  htmlFor={`grade-${grade.id}`}
                  className={styles.radioButtonBig}
                >
                  <span className={styles.radioLabel}>{grade.label}</span>
                  <span className={styles.selector}>
                    <input
                      type="radio"
                      id={`grade-${grade.id}`}
                      name="grade"
                      className={styles.radioInput}
                      checked={grade.selected}
                      onChange={() => handleGradeChange(grade.id)}
                    />
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GradeSelection;