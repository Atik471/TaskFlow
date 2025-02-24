import Task from "./Task";
import { useCallback, useContext} from "react";
import { Taskcontext } from "../contexts/TaskProvider";

const ToDo = () => {
  const { todoTasks, setTodoTasks } = useContext(Taskcontext);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setTodoTasks((prevCards) => {
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
        task={task} category="To-Do" tasks={todoTasks} setTasks={setTodoTasks}
      />
    )
  }, [])

  return (
    <div>
      <div >{todoTasks.map((card, i) => renderCard(card, i))}</div>
    </div>
  );
};

export default ToDo;
