import { Col, Container, Row, Spinner } from "react-bootstrap";

import firebase from "./utils/firebase";
import "firebase/compat/firestore";

import "./App.scss";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Task from "./components/Task";

const db = firebase.firestore(firebase);

function App() {
  const [tasks, setTasks] = useState(null);
  const [reloadTasks, setReloadTask] = useState(false);
  useEffect(() => {
    const tasksRef = query(collection(db, "task"), orderBy("completed"));

    onSnapshot(tasksRef, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });
    setReloadTask(false);
  }, [reloadTasks]);

  return (
    <Container fluid className="app">
      <div className="title">
        <h1>JhonCT</h1>
      </div>

      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Today</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          {!tasks ? (
            <div className="loading">
              <Spinner animation="border"></Spinner>
              <span>Cargando....</span>
            </div>
          ) : tasks.length == 0 ? (
            <h3>No hay tareas</h3>
          ) : (
            tasks.map((item, index) => {
              return (
                <Task
                  key={index}
                  task={item}
                  setReloadTask={setReloadTask}
                ></Task>
              );
            })
          )}
        </Col>

        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTask setReloadTask={setReloadTask}></AddTask>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
