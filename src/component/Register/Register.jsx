import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authRegister } from "../firebase/auth";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

export default function Register() {
  const nav = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async () => {
    try {
      const res = await authRegister(email, password);
      if (res.uid) {
        nav("/");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const password = watch("password");
  const email = watch("email");

  const goToLog = () => {
    nav("/login");
  };

  const showPassword = () => {
    const input = document.getElementsByName("password")[0];
    input.type = input.type == "password" ? "text" : "password";
    const eye = document.getElementsByName("IoEye")[0];
    const eyeOff = document.getElementsByName("IoMdEyeOff")[0];
    eye.classList == "d-block"? (eye.classList = "d-none"): (eye.classList = "d-block");
    eyeOff.classList == "d-none"? (eyeOff.classList = "d-block"): (eyeOff.classList = "d-none");
  };

  return (
    <>
    
      <Form
        className="col-lg-4 border rounded-3 mt-5 p-3 col-11"
        style={{margin :'auto',backgroundColor:'#ececef'}}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>register</h1>
        <div className="m-lg-3">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|co\.uk|eg)$/,
              })}
              placeholder="Enter email"
            />
            {errors.email?.type == "required" && (
              <p className="text-danger">Email is required</p>
            )}
            {errors.email?.type == "pattern" && (
              <p className="text-danger">Invalid Email</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
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
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password?.type == "required" && (
              <p className="text-danger">password is required</p>
            )}
          </Form.Group>
          <p className="m-0">
            Do you have account ?
            <p
              onClick={goToLog}
              className="d-inline-block text-primary"
              style={{ cursor: "pointer" }}
            >
              Login now
            </p>
          </p>
          <Button className="border-none w-100" variant="success" type="submit" style={{backgroundColor:'#fc6238',border:'none'}}>
            Register
          </Button>
        </div>
      </Form>
    </>
  );
}
