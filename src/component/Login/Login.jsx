import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { authLogin } from "../firebase/auth";
// import { auth } from "../firebase/firebase";
function Login() {
  const navigate = useNavigate();

  // const { handleSubmit } = useForm({ mode: "onChange" });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const nav = useNavigate();

  const validationInput = (eve) => {
    if (eve.target.name == "email") {
      setUser({ ...user, email: eve.target.value });
    } else if (eve.target.name == "password") {
      setUser({ ...user, password: eve.target.value });
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await authLogin(email, password);
    if (res.uid) {
      navigate("/");
    }
  };

  const showPassword = () => {
    const input = document.getElementsByName("password")[0];
    input.type = input.type == "password" ? "text" : "password";
    const eye = document.getElementsByName("IoEye")[0];
    const eyeOff = document.getElementsByName("IoMdEyeOff")[0];
    eye.classList == "d-block"
      ? (eye.classList = "d-none")
      : (eye.classList = "d-block");
    eyeOff.classList == "d-none"
      ? (eyeOff.classList = "d-block")
      : (eyeOff.classList = "d-none");
  };

  const goToReg = () => {
    navigate("/register");
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          submit(e);
        }}
        className="col-lg-4 border rounded-3 mt-5 p-3 col-11"
        style={{margin :'auto',backgroundColor:'#ececef'}}
      >
        <h1>Login</h1>
        <div className="m-lg-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => {
                validationInput(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label>Password</Form.Label>
              <IoEye
                name="IoEye"
                className="d-block"
                onClick={() => {
                  showPassword();
                }}
              />
              <IoMdEyeOff
                name="IoMdEyeOff"
                className="d-none"
                onClick={() => {
                  showPassword();
                }}
              />
            </div>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => {
                validationInput(e);
              }}
            />
          </Form.Group>
          <p className="m-0">
            Dont have an account ? 
            <p
              onClick={goToReg}
              className="d-inline-block text-primary"
              style={{ cursor: "pointer" }}
            >
              register now 
            </p>
          </p>
          <Button className="w-100" variant="primary" type="submit">
            Login 
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Login;
