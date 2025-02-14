import styles from '../MaterialImport.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function MaterialUpload({ onMaterialSelect }) {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([
    { id: 'religion', label: 'Religion_AB.pdf', selected: false },
    { id: 'grimm', label: 'www.grimmsmaerchen.de', selected: false },
    { id: 'konsum', label: 'Nachhaltiger Konsum_AB.png', selected: false },
  ]);

  const [uploadOptions, setUploadOptions] = useState([
    { id: 'select', label: 'Material wählen', selected: false },
    { id: 'continue', label: 'Ohne fortfahren', selected: false },
  ]);

  // Mapping of material IDs to fixed parameter values.
  const materialParameters = {
    religion: {
      topic: "Selbstwertschätzung",
      subject: "Religion",
      competency: "Mensch - be­schrei­ben, was sie selbst und an­de­re aus­macht"
    },
    grimm: {
      topic: "Märchen",
      subject: "Deutsch",
      competency: "Mit Texten und anderen Medien umgehen - Lesefähigkeit erweitern"
    },
    konsum: {
      topic: "Nachhaltiger Konsum",
      subject: "Sachunterricht",
      competency: "Demokratie und Gesellschaft - Arbeit und Konsum"
    }
  };

  const handleMaterialChange = (selectedId) => {
    setMaterials(prevMaterials =>
      prevMaterials.map(material => ({
        ...material,
        selected: material.id === selectedId
      }))
    );
    if (onMaterialSelect && materialParameters[selectedId]) {
      onMaterialSelect(materialParameters[selectedId]);
    }
    // Redirect to /setup and pass the fixed parameter values in location state.
    navigate("/setup", { state: materialParameters[selectedId] });
  };

  const handleUploadOptionChange = (selectedId) => {
    setUploadOptions(prevOptions =>
      prevOptions.map(option => ({
        ...option,
        selected: option.id === selectedId
      }))
    );
  };

  // Only show material options when the "select" option is selected.
  const showMaterials = uploadOptions.find(option => option.id === 'select')?.selected;

  return (
    <section className={styles.upload}>
      <h2 className={styles.heading}>
        Möchtest du <span className={styles.highlight}>Material</span> für den Kontext hochladen?
      </h2>
      <div className={styles.uploadOptions}>
        {showMaterials && (
          <div className={styles.options}>
            {materials.map(material => (
              <div key={material.id} className={styles.radioButton}>
                <input
                  type="radio"
                  id={`material-${material.id}`}
                  name="material"
                  className={styles.radioInput}
                  checked={material.selected}
                  onChange={() => handleMaterialChange(material.id)}
                />
                <label htmlFor={`material-${material.id}`} className={styles.radioLabel}>
                  {material.label}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className={styles.uploadForm}>
          <div className={styles.container}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7da5ffe85d6946038bc7fd898fe05285/3d878ce05072109cf9cc344915f8414326bec08e5f43188f8d50b191ddeefd73?apiKey=7da5ffe85d6946038bc7fd898fe05285&"
              className={styles.uploadIcon}
              alt=""
            />
            <div className={styles.contentWrapper}>
              <div className={styles.textWrapper}>
                <h3 className={styles.uploadTitle}>
                  <span className={styles.highlight}>Unterichtsmaterial</span> als{' '}
                  <span className={styles.normalText}>Grundlage</span>
                </h3>
                <p className={styles.uploadDescription}>
                  Dokument, Bild oder Link hochladen, um Parameter direkt zu übernehmen.
                </p>
              </div>
              <div className={styles.selectionWrapper}>
                {uploadOptions.map(option => (
                  <label
                    key={option.id}
                    htmlFor={`upload-${option.id}`}
                    className={styles.radioButtonBig}
                  >
                    <span className={styles.radioLabel}>{option.label}</span>
                    <span className={styles.selector}>
                      <input
                        type="radio"
                        id={`upload-${option.id}`}
                        name="uploadOption"
                        className={styles.radioInput}
                        checked={option.selected}
                        onChange={() => handleUploadOptionChange(option.id)}
                      />
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

MaterialUpload.propTypes = {
  onMaterialSelect: PropTypes.func.isRequired,
};

export default MaterialUpload;