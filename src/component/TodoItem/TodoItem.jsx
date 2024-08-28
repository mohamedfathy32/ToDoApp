import { MdPanoramaFishEye } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

/* eslint-disable react/prop-types */
function TodoItem({ task, completeTask, deleteTask, editTask }) {
  return (
    <>
      <div className="d-flex align-items-center flex-wrap justify-content-between">
        <div className="d-flex align-items-center">
          <MdPanoramaFishEye
            onClick={() => completeTask(task.id, task.completed)}
            className="fs-5 mt-1"
            style={{
              display: task.completed ? "none" : "block",
              cursor: "pointer",
            }}
          />
          <CiCircleCheck
            onClick={() => completeTask(task.id, task.completed)}
            className="fs-5 mt-1"
            style={{
              display: task.completed ? "block" : "none",
              cursor: "pointer",
            }}
          />
          <p
            id={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            className="px-lg-3 p-2 me-3 my-3 m-lg-2  fs-3"
          >
            {task.text}
          </p>
        </div>
        <br />
        <div>
          <MdDelete
            className="fs-5 text-danger mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => deleteTask(task.id)}
          />
          <MdEdit
            className="fs-5 ms-2"
            style={{ cursor: "pointer" }}
            onClick={() => editTask(task)}
          />
        </div>
      </div>
    </>
  );
}

export default TodoItem;
