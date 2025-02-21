import Done from "./Done";
import InProgress from "./InProgress";
import TaskForm from "./TaskForm";
import ToDo from "./ToDo";


const Home = () => {

    return (
        <div>
            <TaskForm />
            <ToDo />
            <InProgress />
            <Done />
        </div>
    );
};

export default Home;