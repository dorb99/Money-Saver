import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

function LoginForm() {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitlogin = (data) => {
    if (localStorage.length > 0 && localStorage.getItem(data.name)) {
      if (
        JSON.parse(localStorage.getItem(data.name)).password === data.password
      ) {
        setUser(data.name);
        navigate("/UserHome");
      } else toast.warning("Incorrect password");
    } else toast.warning("Username not found");
  };

  return (
    <>
      <form className="login" onSubmit={handleSubmit(onSubmitlogin)}>
        <label className="label_login" htmlFor="name">
          Name:
        </label>
        <input
          className="input_login"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name && <p style={{ color: "red" }}>Name is required</p>}

        <label className="label_login" htmlFor="password">
          Password:
        </label>
        <input
          className="input_login"
          {...register("password", { required: true, maxLength: 20 })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>Password is required</p>
        )}

        <input className="submit_login" type="submit" value="Submit" />
      </form>
    </>
  );
}

export default LoginForm;
