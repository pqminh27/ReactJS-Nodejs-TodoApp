import React from "react";
// import {useRef, useState} from "react";

const TodoForm = (props) => {
    // const todoTextInputRef = useRef("");
    // const [input, setInput] = useState("");
    // const [newTodoTask, setNewTodoTask] = useState("");

    // const changeHandler = (event) => {
    //     // event.preventDefault();
    //     setNewTodoTask(event.target.value);
    // };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     props.onSubmit({
    //         id: Math.floor(Math.random() * 10000),
    //         text: input,
    //     });
    //     setInput("");
    //     // const enteredText = todoTextInputRef.current.value;
    //     // if (enteredText.trim().length === 0) return;
    // };

    return (
        <>
            <div className="flex items-end justify-center">
                <input
                    type="text"
                    placeholder="Input todo task"
                    onChange={props.handleChange}
                    className="text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-2/4"
                ></input>
                <button
                    className="mx-6 text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg w-1/4"
                    onClick={props.onClick}
                >
                    Add Todo Task
                </button>
            </div>
        </>
    );
};

export default TodoForm;
