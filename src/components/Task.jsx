import axios from "axios";
import PropTypes from "prop-types";
import { useContext } from "react";
import { APIcontext } from "../contexts/APIprovider";

const Task = ({ task }) => {
    const API = useContext(APIcontext);

    const handleDelete = async () => {
        await axios.delete(`${API}/tasks/${task._id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
};

export default Task;