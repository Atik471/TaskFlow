import { BiPlus } from "react-icons/bi";
import usePostTask from "../hooks/usePostTask";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-modal";
import { useContext, useState } from "react";
import { APIcontext } from "../contexts/APIprovider";
import { AuthContext } from "../contexts/AuthProvider";

const TaskForm = () => {
  const API = useContext(APIcontext);
  const { user } = useContext(AuthContext);
  const currentDate = new Date();
  const { postTask, loading, error, data } = usePostTask(API);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "To-Do",
      user: `${user.email}`,
      currentDate: `${currentDate}`,
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (formData) => {
    await postTask(formData);

    if (!error) {
      closeModal();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <button onClick={() => openModal({ title: "New task" })}>
          <BiPlus /> <span>Add a task</span>
        </button>
      </div>

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
        <h2>Create a New Task</h2>
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
                <input {...field} type="text" placeholder="Enter task title" />
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
                <textarea {...field} placeholder="Enter task description" />
              )}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>

          {/* <div>
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
          </div> */}

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

        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && (
          <div>
            <h2>Task Created Successfully!</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskForm;
