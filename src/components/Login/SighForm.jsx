import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";

function SighForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitsigh = (data) => {
    const newuser = {
      name: data.name,
      password: data.password,
      budget: data.budget,
    };
    setUser(newuser.name);
    localStorage.setItem(data.name, JSON.stringify(newuser));
    navigate("/UserHome");
  };
  return (
    <>
      <form className="login" onSubmit={handleSubmit(onSubmitsigh)}>
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
        <label className="label_login" htmlFor="monthly_budget">
          Birthday:
        </label>
        <input
        type="date"
          className="input_login"
          {...register("birthday", { required: true })}
        />
        {errors.birthday && (
          <p style={{ color: "red" }}>birthday is required</p>
        )}
        <label className="label_login" htmlFor="monthly_budget">
          Email:
        </label>
        <input
        type="email"
          className="input_login"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p style={{ color: "red" }}>email is required</p>
        )}
        <input className="submit_login" type="submit" value="Submit" />
        :
      </form>
    </>
  );
}
export default SighForm;
