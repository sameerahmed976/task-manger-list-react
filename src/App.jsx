import { useState } from "react";
import "./style/style.css";

function App() {
  const [list, setList] = useState([
    {
      id: 1,
      title: "hello",
    },
  ]);

  const showAlert = (show = false, msg = "", value = "") => {
    setAlert({
      show,
      msg,
      value,
    });
  };

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    value: "",
  });

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter valid value");
    } else {
      const newList = {
        id: new Date().getTime().toString(),
        title: name,
      };
    }

    // console.log(newList);
    // console.log([...list, newList]);

    setList([...list, newList]);
    setName("");
  };

  const clearAll = () => {
    setList([]);
  };

  return (
    <main className="App">
      <section className="task-manager__container">
        {alert.show && (
          <section className={`alert alert-${alert.value}`}>
            {alert.msg}
          </section>
        )}

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
                return (
                  <article key={item.id} className="list__card">
                    <h2>{item.title}</h2>
                    <article className="btn btn--group">
                      <button className="btn btn--edit">edit</button>
                      <button className="btn btn--delete">delete</button>
                    </article>
                  </article>
                );
              })}
              <section className="container">
                <button className="btn btn-clear" onClick={clearAll}>
                  clear button
                </button>
              </section>
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
