import { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

import "./App.css";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // READ
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);

      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };


  // CREATE
  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, {
        title,
      });

      setTodos((prevTodos) => [
        response.data,
        ...prevTodos,
      ]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };


  // UPDATE
  const updateTodo = async (id, data) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        data
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id
            ? response.data
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  // DELETE
  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/${id}`
      );

      setTodos((prevTodos) =>
        prevTodos.filter(
          (todo) => todo._id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };


  // Load todos when application starts
  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="container">

      <h1>MERN Todo List</h1>

      <TodoForm onAdd={addTodo} />

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <div className="todo-list">

          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default App;