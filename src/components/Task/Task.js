import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";

import "./Task.scss";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

const db = firebase.firestore(firebase);

export default function Task({ task, setReloadTask }) {
  const completeTask = () => {
    const taskRef = doc(collection(db, "task"), task.id);

    const updatedData = {
      completed: !task.completed,
    };

    updateDoc(taskRef, updatedData)
      .then(() => {
        console.log("Task updated successfully!");
        setReloadTask(true);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const deleteTask = () => {
    const taskRef = doc(collection(db, "task"), task.id);

    deleteDoc(taskRef)
      .then(() => {
        console.log("Task deleted successfully!");
        setReloadTask(true);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div className="task">
      <div>
        <Check
          className={task.completed ? "completed" : ""}
          onClick={completeTask}
        ></Check>
      </div>

      <div>{task.name}</div>
      <div>
        <Delete onClick={deleteTask}></Delete>
      </div>
    </div>
  );
}
