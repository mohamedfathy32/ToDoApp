/* eslint-disable no-unused-vars */
import { Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./todo.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [taskText, setTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const q = query(
          collection(db, "users2", user.uid, "todos"),
          where("isDeleted", "==", false)
        );
        onSnapshot(q, (querySnapshot) => {
          const todosArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todosArray);
        });
      } else {
        setUser(null);
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);
  const addTask = async () => {
    if (user == null) {
      alert("You must be logged in to add tasks!");
      nav("/register");
    } else {
      if (taskText.trim() === "") return;
      await addDoc(collection(db, "users2", user.uid, "todos"), {
        text: taskText,
        completed: false,
        isDeleted: false,
      });
      setTaskText("");
    }
  };

  const completeTask = async (taskId, currentStatus) => {
    const taskDocRef = doc(db, "users2", user.uid, "todos", taskId);
    await updateDoc(taskDocRef, { completed: !currentStatus });
  };

  const deleteTask = async (taskId) => {
    const taskDocRef = doc(db, "users2", user.uid, "todos", taskId);
    await updateDoc(taskDocRef, {
      isDeleted: true,
    });
  };

  const editTask = async (taskId, newTaskText) => {
    if (newTaskText.trim() === "") return;

    const taskDocRef = doc(db, "users2", user.uid, "todos", taskId);
    await updateDoc(taskDocRef, {
      text: newTaskText,
    });

    // Clear the editing state
    setTaskText("");
    setEditingTaskId(null);
  };

  const handleEditClick = (task) => {
    setTaskText(task.text);
    setEditingTaskId(task.id);
  };
  const handleSaveClick = async () => {
    if (editingTaskId) {
      await editTask(editingTaskId, taskText);
    } else {
      await addTask();
    }
  };
  return (
    <>
      <Row className="justify-content-center">
        <Row className="justify-content-center align-items-center mt-5 col-lg-6">
          <div id="todo-input-container">
            <h3 id="todo-title">
              To-Do List{" "}
              <span role="img" aria-label="emoji">
                📋
              </span>
            </h3>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Add your task"
                id="todo-input"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
              <Button
                onClick={() => handleSaveClick()}
                variant="warning"
                id="todo-button"
              >
                Add
              </Button>
            </InputGroup>
            {todos.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
                editTask={() => handleEditClick(task)}
              />
            ))}
          </div>
        </Row>
      </Row>
    </>
  );
}

export default ToDoList;
