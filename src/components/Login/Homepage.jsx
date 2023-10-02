import React, { useState } from "react";
import ToggleButton from "react-toggle-button";
import LoginForm from "./LoginForm";
import SignForm from "./SighForm";
import "./Login_Home.css";

function Homepage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };
  return (
    <div className="page-container">
      <h1>hi!</h1>
      <p className="welcome-text">
        Welcome to the best saving app there is. We will help you keep track of
        your money, your monthly expenses, and all of this is completely free.
        Just sign in and enjoy! <br />
      </p>
      <ToggleButton
        inactiveLabel={"sign"}
        activeLabel={"log"}
        value={isSignIn}
        onToggle={handleToggle}
      />
      {isSignIn ? <LoginForm /> : <SignForm />}
      <div className="picture-section">
        <div className="picture-container">
          <img src="../../../public/images/Americas-Spending.jpg" alt="Picture 1" />
        </div>
        <div className="picture-container">
          <img src="../../../public/images/budget_calendar.avif" alt="Picture 2" />
        </div>
        <div className="picture-container">
          <img src="../../../public/images/budget-chart.jpg" alt="Picture 3" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
