import React, { useState } from 'react';
import './App.css';

//Creating a Todo function component
//Each Todo is going to be div with text inside
function Todo({ todo, index, completeTodo, removeTodo }) {

  return (
    <div style={{textDecoration: todo.isCompleted ? 'line-through' : ''}} className="todo">
      {todo.text}
      <div>
        <button onClick={()=>completeTodo(index)}>Complete</button>
        <button onClick={()=>removeTodo(index)}>X</button>
      </div>
    </div>
  )
}
// {} the brackets are destructuring the method form props
function TodoForm({ addTodo }) {
  //Hook: destructuring [variable, method] = useState();
  // var _useState = useState();
  // variable = _useState[0]; useState is treated as an array
  // method = _useState[1];
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // don't submit if there's an empty value
    if (!value) return;
    addTodo(value);
    setValue("");
  }
  return (
    // with e.target.value -> that's how we get to the value of the input tag
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => 
      setValue(e.target.value)} placeholder="Add todo..."/>
    </form>
  )
}

//Creating the highest level App component
//using a react hook
function App() {
  // destructuring the "state"
  // we have a todo variable
  //and a function that will set the new "state" of the variable
  // useState function is initialized with a "state" (array of objects)
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friends for lunch',
      isCompleted: false
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) =>
          <Todo key={index} index={index} todo={todo} 
          completeTodo={completeTodo}
          removeTodo={removeTodo}/>
        )}
        <TodoForm addTodo={addTodo}/>
      </div>
    </div>
  )

}

export default App;