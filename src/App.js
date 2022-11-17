import React from 'react';
import './App.css';

function App() {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  const addNew = (task) => {
    task.id = Math.round(Math.random() * 10000);
    setTasks(tasks.concat(task));
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({ text: text, isActive: false, isCompleted: false });

    setText('');
  };

  return (
    <div className="todo-app">
      <div className="todo-app__container">
        <h1 className="todo-app__heading">#todo</h1>

        <nav className="todo-app__navbar">
          <ul className="todo-app__navbar__menu">
            <li>All</li>
            <li>Active</li>
            <li>Completed</li>
          </ul>
        </nav>

        <section>
          <form className="todo-app__searchbox" onSubmit={handleSubmit}>
            <div className="todo-app__searchbox__input">
              <input
                type="text"
                placeholder="add details"
                onChange={handleChange}
                value={text}
              />
            </div>

            <button className='todo-app__searchbox__btn"' type="submit">
              Add
            </button>
          </form>

          <ul className="todo-app__todo-list">
            {tasks.map((task) => (
              <li key={task.id}>{task.text}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
