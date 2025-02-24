import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { APIcontext } from "./APIprovider";
import axios from "axios";

export const Taskcontext = createContext()

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = useContext(APIcontext);

  useEffect(() => {
    axios
      .get(`${API}/tasks`)
      .then((res) => {
        setTasks(res.data);
        setTodoTasks(
            res.data
              .filter((task) => task.category === "To-Do")
              .sort((a, b) => a.order - b.order) || []
          );
          setInProgressTasks(
            res.data
              .filter((task) => task.category === "In Progress")
              .sort((a, b) => a.order - b.order) || []
          );
          setDoneTasks(
            res.data
              .filter((task) => task.category === "Done")
              .sort((a, b) => a.order - b.order) || []
          );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [API]);

  if (loading) return <p>Loading...</p>;
    
    return (
        <Taskcontext.Provider value={{tasks, setTasks, todoTasks, setTodoTasks, inProgressTasks, setInProgressTasks, doneTasks, setDoneTasks}}>
            {children}
        </Taskcontext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.object.isRequired,
}

export default TaskProvider;