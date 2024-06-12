import React, { useState } from "react"; // Import React and useState hook
import { Todo } from "./Todo"; // Import Todo component
import { TodoForm } from "./TodoForm"; // Import TodoForm component
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 function to generate unique IDs
import { EditTodoForm } from "./EditTodoForm"; // Import EditTodoForm component

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]); // Initialize state for todos, starting with an empty array

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos([
      ...todos, // Spread current todos
      { id: uuidv4(), task: todo, completed: false, isEditing: false }, // Add new todo object with unique ID
    ]);
  }

  // Function to delete a todo by its ID
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  // Function to toggle the completed status of a todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Toggle 'completed' property
      )
    );
  }

  // Function to toggle the editing status of a todo
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo // Toggle 'isEditing' property
      )
    );
  }

  // Function to update the task of a todo
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo // Update 'task' and toggle 'isEditing'
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      {/* Form to add a new todo */}
      <TodoForm addTodo={addTodo} />
      {/* Map over todos and display either Todo or EditTodoForm component based on 'isEditing' */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} /> // Display EditTodoForm if in editing mode
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          /> // Display Todo component with props for functions
        )
      )}
    </div>
  );
};
