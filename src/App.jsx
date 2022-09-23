import { useEffect, useState } from "react";
import ListCard from "./ListCard";
import ShowAlert from "./ShowAlert";
import "./style/style.css";

const getItemLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  // const [name, setName] = useState("hello");
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [setId, setSetId] = useState(null);

  const [list, setList] = useState(getItemLocalStorage());
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

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const deleteButton = (id) => {
    // console.log(id);
    showAlert(true, "a task delete", "danger");

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
    showAlert(true, "edit a task", "danger");
  };

  const clearAll = () => {
    showAlert(true, "removed all tasks", "danger");
    setList([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "please add a valid value", "danger");
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
      showAlert(true, "added a value", "success");
      setList([...list, newList]);
      setName("");
      setIsEdit(false);
      setSetId("");
    }

    // console.log(newList);
    // console.log([...list, newList]);
  };

  return (
    <main className="app">
      {alert.show && <ShowAlert showAlert={showAlert} list={list} {...alert} />}

      <section className="task-manager__container">
        <section className="task-manager__title">
          <h1 className="task-manager__heading">Task List Manager</h1>
        </section>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="task">
            <input
              type="text"
              name="task"
              id="task"
              placeholder="enter the  task list"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input__text"
            />
          </label>
          <button className="btn btn--submit">
            {!isEdit ? "Submit" : "edit"}
          </button>
        </form>

        <section className="list__container">
          {list.length > 0 ? (
            <section>
              {list.map((item) => {
                return (
                  // <article key={item.id} className="list__card">
                  //   <h2>{item.title}</h2>
                  //   <article className="btn btn--group">
                  //     <button
                  //       className="btn btn--edit"
                  //       onClick={() => editButton(item.id)}
                  //     >
                  //       edit
                  //     </button>
                  //     <button
                  //       className="btn btn--delete"
                  //       onClick={() => deleteButton(item.id)}
                  //     >
                  //       delete
                  //     </button>
                  //   </article>
                  // </article>
                  <ListCard
                    item={item}
                    key={item.id}
                    editButton={editButton}
                    deleteButton={deleteButton}
                  />
                );
              })}
              <section className="container">
                <button className="btn btn__clear" onClick={clearAll}>
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
