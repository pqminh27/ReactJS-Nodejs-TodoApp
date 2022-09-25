import React from "react";
// import TodoForm from "./TodoForm";

const TodoTask = (props) => {
    return (
        <div className="my-10 justify-center text-center">
            {props.isDone ? (
                <li className="line-through text-2xl justify-center text-center list-none">
                    {props.name}
                </li>
            ) : (
                <li className="text-2xl justify-center text-center list-none">
                    {props.name}
                </li>
            )}
            <button
                className=" bg-cyan-400 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg justify-center text-center"
                onClick={() => props.changeStatusOfTodoTask(props.id)}
            >
                Complete
            </button>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => props.deleteTodoTask(props.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default TodoTask;
