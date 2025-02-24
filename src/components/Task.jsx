import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useRef, useState } from "react";
import { APIcontext } from "../contexts/APIprovider";
import Modal from "react-modal";
import UpdateTask from "./UpdateTask";
import { useDrag, useDrop } from "react-dnd";
import { Taskcontext } from "../contexts/TaskProvider";


const Task = ({task, tasks, setTasks, category, index, id, moveCard}) => {
  const API = useContext(APIcontext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { todoTasks, inProgressTasks, doneTasks } = useContext(Taskcontext);

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "TASK",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
    drop: async (item) => {
      try {
        category === "To-Do" && axios.put(`${API}/tasks/reorder`, { tasks: todoTasks })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.error("Failed to update task order:", err);
                });
        category === "In Progress" && axios.put(`${API}/tasks/reorder`, { tasks: inProgressTasks })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.error("Failed to update task order:", err);
                });
        category === "Done" && axios.put(`${API}/tasks/reorder`, { tasks: doneTasks })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.error("Failed to update task order:", err);
                });
      } catch (error) {
        console.error("Failed to update task order:", error);
      }
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  // const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  const openModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/tasks/${task._id}`);
      setTasks(tasks.filter((t) => t._id !== task._id));
    } catch (err) {
      console.error(err);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      // ref={(node) => drag(drop(node))}
      ref={ref} data-handler-id={handlerId}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        margin: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        cursor: "move",
      }}
    >
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
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: "20px",
            textAlign: "center",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <h2>Confirm Action</h2>
        <button onClick={handleDelete} style={{ marginRight: "10px", padding: "5px 10px" }}>Confirm</button>
        <button onClick={handleCancel} style={{ padding: "5px 10px" }}>Cancel</button>
      </Modal>

      <UpdateTask isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} task={task} />
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default Task;
