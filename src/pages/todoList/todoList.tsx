import React from 'react';
import './todoList.css';

export default function TodoList() {
  const [newTodo, setNewTodo] = React.useState("");
  const { todos, addTodo, deleteTodo } = useTodos();

  const handleNewTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (newTodo.length) {
      addTodo(newTodo);
      setNewTodo("");
    }
  }

  return (
    <div className="todoList">
      <h1>Todo List</h1>
      <div>
        <form onSubmit={handleNewTodo} className='newTodoForm'>
          <input aria-label='new task' name='new task' type="text" placeholder="Add your task" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <ul className='todoList' role='region' aria-live="polite">
        { todos.map(todo => (
          <li className='todoRow'>
            <span>{todo.name}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Todo {
  id: number;
  name: string;
}

function useTodos() {
  const idRef = React.useRef(1);
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const addTodo = (name: string) => {
    setTodos(prev => [...prev, { id: idRef.current, name: name }]);
    idRef.current++;
  }

  return {
    todos,
    addTodo,
    deleteTodo: (id: number) => setTodos(prev => prev.filter(todo => todo.id !== id))
  }
}