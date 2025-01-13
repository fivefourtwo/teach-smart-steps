import PropTypes from 'prop-types';

const CreateTaskButton = ({ onClick }) => (
  <button className="create-task-btn" onClick={onClick}>
    <span>Neue Aufgabe zur </span>
    <span className="bold">Medienbildung </span>
    <span>erstellen ...</span>
  </button>
);

CreateTaskButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CreateTaskButton; 