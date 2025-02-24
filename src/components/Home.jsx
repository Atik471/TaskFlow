import Done from "./Done";
import InProgress from "./InProgress";
import TaskForm from "./TaskForm";
import ToDo from "./ToDo";
import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Taskcontext } from "../contexts/TaskProvider";

const Home = () => {
  const { inProgressTasks, doneTasks } = useContext(Taskcontext);

  return (
    <div>
      <TaskForm />
      <DndProvider backend={HTML5Backend}>
        <ToDo />
        <InProgress tasks={inProgressTasks} />
        <Done tasks={doneTasks} />
      </DndProvider>
    </div>
  );
};

export default Home;
