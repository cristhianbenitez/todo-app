import React from 'react';
import './App.css';

function App() {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const [currentTodos, setCurrentTodos] = React.useState('all');

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

  const conditionedTasks = () => {
    if (currentTodos === 'all') return tasks;
    if (currentTodos === 'active')
      return tasks.filter((t) => t.isActive === true);
    if (currentTodos === 'completed')
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
            <li onClick={() => setCurrentTodos('all')}>All</li>
            <li onClick={() => setCurrentTodos('active')}>Active</li>
            <li onClick={() => setCurrentTodos('completed')}>Completed</li>
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
            {conditionedTasks().map(({ text, id, isCompleted, isActive }) => (
              <li key={id}>
                <input
                  type="checkbox"
                  id={`task-checkbox-${id}`}
                  onChange={() => completeTask(id)}
                />
                <label
                  for={`task-checkbox-${id}`}
                  style={{ textDecoration: isCompleted && 'line-through' }}
                >
                  {text}
                </label>
                {isCompleted && currentTodos === 'completed' && (
                  <span onClick={() => deleteTask(id)}>Delete</span>
                )}
              </li>
            ))}
          </ul>
          {isAnyTaskCompleted && currentTodos === 'completed' && (
            <span onClick={deleteAllCompleted}>Delete</span>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
