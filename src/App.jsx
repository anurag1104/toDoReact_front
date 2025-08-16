import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('https://todoreact-sgsu.onrender.com/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await fetch('https://todoreact-sgsu.onrender.com/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTodo })
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setNewTodo('');
  };

  //   const addTodo = axios.get('/api/todos')
  // .then(res => console.log(res.data))
  // .catch(err => console.error(err));

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`https://todoreact-sgsu.onrender.com/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    const data = await res.json();
    setTodos(todos.map(todo => (todo.id === id ? data : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`https://todoreact-sgsu.onrender.com/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">✅ Todo App</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded shadow-sm"
            >
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
                onClick={() => toggleTodo(todo.id, todo.completed)}
              >
                {todo.task}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
