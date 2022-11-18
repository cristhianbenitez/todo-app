import React from 'react';

import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [currentTab, setCurrentTab] = useLocalStorage('currentTab', 'all');

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const taskById = (id) => tasks.find((t) => t.id === id);

  const isAnyTaskCompleted = tasks.find((t) => t.isCompleted === true);

  const addNew = (task) => {
    task.id = Math.round(Math.random() * 10000);
    setTasks(tasks.concat(task));
  };

  const completeTask = (id) => {
    const task = taskById(id);

    const complete = {
      ...task,
      isCompleted: !task.isCompleted,
      isActive: !task.isActive
    };

    setTasks(tasks.map((t) => (t.id === id ? complete : t)));
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 0) {
      addNew({ text: text, isActive: true, isCompleted: false });
      setText('');
    }
  };

  const handleCurrentTodo = (e) => {
    setCurrentTab(e.target.innerText.toLowerCase());
  };

  const conditionedTasks = () => {
    if (currentTab === 'all') return tasks;
    if (currentTab === 'active')
      return tasks.filter((t) => t.isActive === true);
    if (currentTab === 'completed')
      return tasks.filter((t) => t.isCompleted === true);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const deleteAllCompleted = () => {
    const filteredTasks = tasks.filter((task) => task.isCompleted !== true);
    setTasks(filteredTasks);
  };

  return (
    <div className="todo-app">
      <div className="todo-app__container">
        <h1 className="todo-app__heading">#todo</h1>

        <nav className="todo-app__navbar">
          <ul className="todo-app__navbar__menu">
            {['All', 'Active', 'Completed'].map((str, i) => {
              const activeClass =
                currentTab === str.toLowerCase() ? 'active-tab' : '';
              return (
                <li key={i} onClick={handleCurrentTodo} className={activeClass}>
                  {str}
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="main">
          {currentTab !== 'completed' && (
            <form className="todo-app__search-box" onSubmit={handleSubmit}>
              <div className="todo-app__search-box__input">
                <input
                  type="text"
                  placeholder="add details"
                  onChange={handleChange}
                  value={text}
                />
              </div>

              <button className="todo-app__search-box__btn" type="submit">
                Add
              </button>
            </form>
          )}

          <ul className="todo-app__todo-list">
            {conditionedTasks().map(({ text, id, isCompleted, isActive }) => (
              <li key={id} className="todo-app__todo-list__item">
                <div>
                  <input
                    type="checkbox"
                    id={`task-checkbox-${id}`}
                    onChange={() => completeTask(id)}
                    checked={isCompleted}
                    className="todo-app__todo-list__item__input"
                  />
                  <label
                    className="todo-app__todo-list__item__label"
                    htmlFor={`task-checkbox-${id}`}
                    style={{ textDecoration: isCompleted && 'line-through' }}
                  >
                    {text}
                  </label>
                </div>
                {isCompleted && currentTab === 'completed' && (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => deleteTask(id)}
                  >
                    delete
                  </span>
                )}
              </li>
            ))}
          </ul>
          {isAnyTaskCompleted && currentTab === 'completed' && (
            <button
              className="todo-app__delete-all-btn"
              onClick={deleteAllCompleted}
            >
              <span class="material-symbols-outlined ">delete_forever</span>
              delete all
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
