import { Link } from "react-router-dom";
import "./General.css";
import { useContext } from "react";
import { UserContext } from "../Context";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  return (
    <header className="navbar">
      {user ? (
        <>
          <Link to="/UserHome">
            <img
              id="right_btn"
              src="./public\images\Home_btn.png"
              alt="HomePage"
              width="50px"
            />
          </Link>
          <Link to="../" onClick={() => setUser("")}>
            Log out
          </Link>
        </>
      ) : (
        <Link to="/">
          <img src="./public\images\Home_btn.png" alt="HomePage" width="50px" />
        </Link>
      )}
    </header>
  );
}
export default Navbar;
