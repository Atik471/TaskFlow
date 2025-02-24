import Task from "./Task";
import { useCallback, useContext} from "react";
import { Taskcontext } from "../contexts/TaskProvider";

const Done = () => {
  const { doneTasks, setDoneTasks } = useContext(Taskcontext);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setDoneTasks((prevCards) => {
      const newTasks = [...prevCards];
  
      const [movedItem] = newTasks.splice(dragIndex, 1);
      newTasks.splice(hoverIndex, 0, movedItem);
  
      const updatedTasks = newTasks.map((task, index) => ({
        ...task,
        order: index, 
      }));
  
      return updatedTasks;
    });
  }, []);

  
  const renderCard = useCallback((task, index) => {
    return (
      <Task
        key={task._id}
        index={index}
        id={task._id}
        // text={card.text}
        moveCard={moveCard}
        task={task} category="Done" tasks={doneTasks} setTasks={setDoneTasks}
      />
    )
  }, [])

  return (
    <div>
      <h1>Done</h1>
      <div >{doneTasks.map((card, i) => renderCard(card, i))}</div>
    </div>
  );
};

export default Done;
