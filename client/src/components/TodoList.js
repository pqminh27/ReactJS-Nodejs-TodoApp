import {useState, useEffect} from "react";
import TodoForm from "./TodoForm";
import TodoTask from "./TodoTask";
import Axios from "axios";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newTodoTask, setNewTodoTask] = useState("");

    const getAPIData = async () => {
        let data = await fetch("http://localhost:5000/api").then((res) =>
            res.json()
        );
        // .then((res) =>
        //     res.map((item) => ({
        //         id: item.id,
        //         name: item.name,
        //         isDone: item.isDone,
        //     }))
        // );
        setTodoList(data);
    };
    useEffect(() => {
        getAPIData();
    }, []);

    const handleChange = (event) => setNewTodoTask(event.target.value);

    const addTodoTask = async () => {
        const task = {
            id:
                todoList.length === 0
                    ? 1
                    : todoList[todoList.length - 1].id + 1,
            name: newTodoTask,
            isDone: false,
        };
        await Axios.post("http://localhost:5000/api/add/", task)
            .then((response) => {
                console.log(response);
            })
            .then(
                setTodoList(task.name !== "" ? [...todoList, task] : todoList)
            )
            .catch((error) =>
                console.error(
                    "There was an error with adding new todo task!",
                    error
                )
            );
        // setTodoList(task.name !== "" ? [...todoList, task] : todoList);
    };

    const deleteTodoTask = async (id) => {
        const deleteURL = "http://localhost:5000/api/delete/" + id;
        // console.log(deleteURL);
        await Axios.delete(deleteURL)
            .then((response) => {
                console.log(response);
            })
            .then(setTodoList(todoList.filter((item) => item.id !== id)))
            .catch((error) =>
                console.error(
                    "There was an error with deleting a todo task!",
                    error
                )
            );
        // setTodoList(todoList.filter((item) => item.id !== id));
    };

    const changeStatusOfTodoTask = async (id) => {
        const isDone = !todoList.find((item) => item.id === id).isDone;
        await Axios.put("http://localhost:5000/api/update/", {
            id,
            isDone,
        })
            .then((response) => {
                console.log(response);
            })
            .then(
                setTodoList(
                    todoList.map((item) => {
                        if (item.id === id) return {...item, isDone};
                        else return item;
                    })
                )
            )
            .catch((error) =>
                console.error(
                    "There was an error with changing status of a todo task!",
                    error
                )
            );
        // setTodoList(
        //     todoList.map((item) => {
        //         if (item.id === id) return {...item, isDone};
        //         else return item;
        //     })
        // );
    };

    return (
        <div className="bg-cyan-200">
            <h1 className="text-3xl font-bold underline text-center text-cyan-800 my-16">
                To Do List App!
            </h1>

            <TodoForm onClick={addTodoTask} handleChange={handleChange} />
            <div className="mx-10 my-10">
                {todoList.map((todo) => {
                    return (
                        <TodoTask
                            name={todo.name}
                            id={todo.id}
                            key={todo.id}
                            isDone={todo.isDone}
                            deleteTodoTask={deleteTodoTask}
                            changeStatusOfTodoTask={changeStatusOfTodoTask}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TodoList;
