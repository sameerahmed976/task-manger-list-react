import { useState } from "react";
import "./style/style.css";

function App() {
  const [list, setList] = useState(["hello"]);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="App">
      <section className="task-manager__container">
        <section className="task-manager__title">Task List Manager</section>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="task">
            <input
              type="text"
              name="task"
              id="task"
              placeholder="enter the  task list"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button className="btn btn--submit">Submit</button>
          </label>
        </form>

        <section className="list__container">
          {list.length > 0 ? (
            <section>
              {list.map((item) => {
                const id = new Date().getTime().toString();

                return (
                  <article key={id} className="list__card">
                    <h2>{item}</h2>
                    <article className="btn btn--group">
                      <button className="btn btn--edit">edit</button>
                      <button className="btn btn--delete">delete</button>
                    </article>
                  </article>
                );
              })}
            </section>
          ) : (
            <h1 className="no-list">Sorry no task list. Add new task list</h1>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
