import { Button, Form } from "react-bootstrap";
import { ReactComponent as Send } from "../../assets/send.svg";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";
import "./AddTask.scss";
import { useState } from "react";
import { isEmpty } from "lodash";

const db = firebase.firestore(firebase);

export default function AddTask({ setReloadTask }) {
  const [task, setTask] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty(task)) {
      db.collection("task")
        .add({
          name: task,
          completed: false,
        })
        .then(() => {
          console.log("tarea creada");
          setTask("");
          setReloadTask(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit} className="add-task">
      <input
        type="text"
        placeholder="Nueva tarea..."
        onChange={(e) => setTask(e.target.value)}
        value={task}
      ></input>
      <Button type="submit">
        <Send></Send>
      </Button>
    </Form>
  );
}
