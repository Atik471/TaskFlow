import PropTypes from "prop-types";
import Task from "./Task";

const ToDo = ({ tasks }) => {
  return (
    <div>
      To Do
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

ToDo.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default ToDo;
