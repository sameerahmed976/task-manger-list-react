import { useEffect, useState } from "react";
import ShowAlert from "./ShowAlert";
import "./style/style.css";

const getItemLocalStorage = (item, id) => {
  const newItem = localStorage.getItem("list");
  if (!newItem) {
    // localStorage;
  }
};

function App() {
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [setId, setSetId] = useState(null);

  const [list, setList] = useState([]);
  //  {
  //     id: 1,
  //     title: "hello",
  //   },
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

  const deleteButton = (id) => {
    // console.log(id);
    setList((list) => {
      return list.filter((item) => item.id !== id);
    });
  };

  const editButton = (id) => {
    const specifiedButton = list.find((item) => item.id === id);
    // console.log(specifiedButton);
    setIsEdit(true);
    setSetId(id);
    setName(specifiedButton.title);
  };

  const clearAll = () => {
    showAlert(true, "empty value", "danger");
    setList([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "empty value", "danger");
      setIsEdit("");
    } else if (name && isEdit) {
      setList(
        list.map((item) => {
          if (item.id === setId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEdit(false);
      setSetId(null);
    } else {
      const newList = {
        id: new Date().getTime().toString(),
        title: name,
      };
      showAlert(true, "please add a value", "success");
      setList([...list, newList]);
      setName("");
      setIsEdit(false);
      setSetId("");
    }

    // console.log(newList);
    // console.log([...list, newList]);
  };

  return (
    <main className="App">
      <section className="task-manager__container">
        {alert.show && (
          <ShowAlert showAlert={showAlert} list={list} {...alert} />
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
            <button className="btn btn--submit">
              {!isEdit ? "Submit" : "edit"}
            </button>
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
                      <button
                        className="btn btn--edit"
                        onClick={() => editButton(item.id)}
                      >
                        edit
                      </button>
                      <button
                        className="btn btn--delete"
                        onClick={() => deleteButton(item.id)}
                      >
                        delete
                      </button>
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
          ) : null}
        </section>
      </section>
    </main>
  );
}

export default App;
