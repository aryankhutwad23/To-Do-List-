import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a To-Do App', completed: false }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Motivational quotes (you can add more)
  const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Small progress each day adds up to big results.",
    "Don’t stop until you’re proud.",
    "Discipline is the bridge between goals and accomplishment."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleSaveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editValue } : todo
      )
    );
    setEditId(null);
    setEditValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <div className="todo-list-card">
        <h1>My To-Do List</h1>
        <p className="quote">💡 {randomQuote}</p>
        <p>
          Total: {todos.length} | Done: {completedCount} | Remaining: {remainingCount}
        </p>

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              {editId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                </>
              ) : (
                <>
                  <span
                    className="todo-text"
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                </>
              )}
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
          {todos.length === 0 && <p className="empty-msg">No tasks yet. Add one above!</p>}
        </ul>
      </div>
    </div>
  );
}

export default App;
