import PropTypes from 'prop-types';

const CreateTaskButton = ({ onClick }) => (
  <button className="create-task-btn" onClick={onClick}>
    <div className="create-task-btn-inner">
      <div className="create-task-btn-text">
        <span className="regular">Neue Aufgabe zur </span>
        <span className="bold">Medienbildung </span>
        <span className="regular">erstellen ...</span>
      </div>
    </div>
  </button>
);

CreateTaskButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CreateTaskButton; 