import React from "react";

const ListCard = ({ item, deleteButton, editButton }) => {
  return (
    <>
      <article className="list__card">
        <h2 className="list__title">{item.title}</h2>
        <article className="btn__group">
          <button className="btn btn--edit" onClick={() => editButton(item.id)}>
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
    </>
  );
};

export default ListCard;
