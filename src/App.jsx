// import { useState } from 'react'

import "./App.css";
import Register from "./component/Register/Register";
import ToDoList from "./component/ToDoList/ToDoList";
import Login from "./component/Login/Login";
import { createHashRouter, RouterProvider } from "react-router-dom";

const routes = createHashRouter([
  { index: true, element: <ToDoList /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
