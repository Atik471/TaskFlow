import axios from "axios";
import Done from "./Done";
import InProgress from "./InProgress";
import TaskForm from "./TaskForm";
import ToDo from "./ToDo";
import { useContext, useState } from "react";
import { APIcontext } from "../contexts/APIprovider";


const Home = () => {
    const [tasks, setTasks] = useState([]);
    const API = useContext(APIcontext);

    axios.get(`${API}/tasks`)
    .then(res => setTasks(res.data))
    .catch(err => console.log(err));

    const todoTasks = tasks
  .filter(task => task.category === 'To-Do') || [];

    return (
        <div>
            <TaskForm />
            <ToDo tasks={todoTasks} />
            <InProgress />
            <Done />
        </div>
    );
};

export default Home;