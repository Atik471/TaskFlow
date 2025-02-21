import PropTypes from "prop-types";

const ToDo = ({ tasks }) => {
    return (
        <div>
            To Do
            {
                tasks.map(task => (
                    <div key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))
            }
        </div>
    );
};

ToDo.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default ToDo;