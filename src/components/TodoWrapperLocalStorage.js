import React, { useState, useEffect } from 'react'; // Import React and hooks
import { TodoForm } from './TodoForm'; // Import TodoForm component
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function to generate unique IDs
import { Todo } from './Todo'; // Import Todo component
import { EditTodoForm } from './EditTodoForm'; // Import EditTodoForm component
uuidv4(); // Generate a unique ID (though this line isn't necessary here)

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]); // Initialize state for todos, starting with an empty array

    // useEffect to load todos from localStorage when the component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || []; // Get saved todos from localStorage
        setTodos(savedTodos); // Set the state with the saved todos
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Function to add a new todo
    const addTodo = todo => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]; // Create new todos array with the new todo
        setTodos(newTodos); // Update state
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save updated todos to localStorage
    }

    // Function to toggle the completed status of a todo
    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo); // Toggle completed property
        setTodos(newTodos); // Update state
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save updated todos to localStorage
    }

    // Function to delete a todo by its ID
    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id); // Filter out the todo with the given ID
        setTodos(newTodos); // Update state
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save updated todos to localStorage
    }

    // Function to toggle the editing status of a todo
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)); // Toggle isEditing property
    }

    // Function to update the task of a todo
    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo); // Update task and toggle isEditing
        setTodos(newTodos); // Update state
        localStorage.setItem('todos', JSON.stringify(newTodos)); // Save updated todos to localStorage
    }

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            {/* Form to add a new todo */}
            <TodoForm addTodo={addTodo} />
            {/* Map over todos and display either Todo or EditTodoForm component based on isEditing */}
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} /> // Display EditTodoForm if in editing mode
                ) : (
                    <Todo
                        task={todo}
                        key={index} // Use index as key (not ideal, better to use unique ID)
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    /> // Display Todo component with props for functions
                )
            ))}
        </div>
    );
}
