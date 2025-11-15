import { useState } from "react";

export default function TypeHere({ imageURL, onSubmit, onCancel }) {

  const [comment, setComment] = useState("");

  return (

    <div className="typehere-container">

      <input
        type="text"
        placeholder="Ваш комментарий..."
        value={comment}
        onChange={(event) => setComment(event.target.value)}/>

      <div className="typehere-buttons">
        <button onClick={() => onSubmit(comment)}>Добавить в избранное</button>
        <button onClick={onCancel}>Отмена</button>
      </div>
    </div>
  );
};