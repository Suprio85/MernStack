import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
    const handleLogout = () => {
        
        dispatch(logout(user));
        navigate("/login");
        dispatch(reset()); 
    }
  return (
    <header>
      <div className="logo">
        <Link to="/"> Goalsetter </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={handleLogout}>
                {" "}
                <FaSignOutAlt /> Logout{" "}
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                {" "}
                <FaSignInAlt /> Login{" "}
              </Link>
            </li>
            <li>
              <Link to="/register">
                {" "}
                <FaUser /> Register{" "}
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
