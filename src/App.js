import React from 'react';
import './App.css';

function App() {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  const taskById = (id) => tasks.find((t) => t.id === id);

  const addNew = (task) => {
    task.id = Math.round(Math.random() * 10000);
    setTasks(tasks.concat(task));
  };

  const completeTask = (id) => {
    const task = taskById(id);

    const complete = {
      ...task,
      isCompleted: !task.isCompleted
    };

    setTasks(tasks.map((t) => (t.id === id ? complete : t)));
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
            {tasks.map(({ text, id, isCompleted, isActive }) => (
              <li key={id}>
                <input
                  type="checkbox"
                  id="task-checkbox"
                  onChange={() => completeTask(id)}
                />
                <label
                  for="task-checkbox"
                  style={{ textDecoration: isCompleted && 'line-through' }}
                >
                  {text}
                </label>
                {isCompleted && <span>Delete</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
