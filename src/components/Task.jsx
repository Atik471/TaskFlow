import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { APIcontext } from "../contexts/APIprovider";
import Modal from "react-modal";
import UpdateTask from "./UpdateTask";

const Task = ({ task }) => {
  const API = useContext(APIcontext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${API}/tasks/${task._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => setIsUpdateModalOpen(true)}>Update</button>
      <button onClick={openModal}>Delete</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        contentLabel="Confirmation Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: "20px",
            textAlign: "center",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Confirm Action</h2>
        <button
          onClick={handleDelete}
          style={{ marginRight: "10px", padding: "5px 10px" }}
        >
          Confirm
        </button>
        <button onClick={handleCancel} style={{ padding: "5px 10px" }}>
          Cancel
        </button>
      </Modal>

      <UpdateTask isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} task={task}></UpdateTask>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
