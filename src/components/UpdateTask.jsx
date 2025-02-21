import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { APIcontext } from "../contexts/APIprovider";
import axios from "axios";

Modal.setAppElement('#root');

const UpdateTask = ({ isModalOpen, setIsModalOpen, task }) => {
  const API = useContext(APIcontext);
  const [loading, setLoading] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: `${task.title}`,
      description: `${task.description}`,
      category: `${task.category}`,
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log(formData);
    await axios.patch(`${API}/tasks/${task._id}`, formData)
    .then((res) => {
        console.log(res);
        setIsModalOpen(false);
    })
    .catch((err) => {
        console.log(err);
        setLoading(false);
    });
    
    closeModal();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
          },
        }}
      >
        <h2>Update Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title (required, max 50 characters):</label>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
                maxLength: {
                  value: 50,
                  message: "Title cannot exceed 50 characters",
                },
              }}
              render={({ field }) => (
                <input {...field} type="text" placeholder="Enter task title"  />
              )}
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title.message}</p>
            )}
          </div>

          <div>
            <label>Description (optional, max 200 characters):</label>
            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: {
                  value: 200,
                  message: "Description cannot exceed 200 characters",
                },
              }}
              render={({ field }) => (
                <textarea {...field} placeholder="Enter task description"  />
              )}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>

          <div>
            <label>Category:</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              )}
            />
          </div>


          <button type="submit" disabled={loading}>
            {loading ? "Creating Task..." : "Create Task"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

UpdateTask.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default UpdateTask;