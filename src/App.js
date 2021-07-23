import React, { useEffect, useState, useReducer } from "react";
import TodoList from "./TodoList";
import { Context } from "./context";
import reducer from "./reducer";
import { stat } from "fs";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos"))
  );
  // const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  const handleClick = () => {
    console.log("click");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));    
  }, [state]);

  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  //   localStorage.setItem("todos", JSON.stringify(todos));
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [todos]);

  const addTodo = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: 'add',
        payload: todoTitle
      });      
      setTodoTitle("");
    }
  };

  // const removeTodo = (id) => {
  //   setTodos(
  //     todos.filter((todo) => {
  //       return todo.id != id;
  //     })
  //   );
  // };

  // const toggleTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //       return todo;
  //     })
  //   );
  // };

  return (
    <Context.Provider
      value={{
        dispatch
        // toggleTodo,
        // removeTodo,
      }}
    >
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            onKeyPress={addTodo}
          />
          <label>Todo name</label>
        </div>

        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}
