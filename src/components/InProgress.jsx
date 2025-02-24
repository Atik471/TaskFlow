import Task from "./Task";
import { useCallback, useContext} from "react";
import { Taskcontext } from "../contexts/TaskProvider";
// import update from 'immutability-helper'

const InProgress = () => {
  const { inProgressTasks, setInProgressTasks } = useContext(Taskcontext);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setInProgressTasks((prevCards) => {
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
        task={task} category="In Progress" tasks={inProgressTasks} setTasks={setInProgressTasks}
      />
    )
  }, [])

  return (
    <div>
      <h1>In progress</h1>
      <div >{inProgressTasks.map((card, i) => renderCard(card, i))}</div>
    </div>
  );
};

export default InProgress;
