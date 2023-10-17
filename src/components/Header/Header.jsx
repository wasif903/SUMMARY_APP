import React from "react";
import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className={style.header_wrapper}>
      <div className={style.header_div}>
        <img
          src={logo}
          onClick={() => navigate("/")}
          role="button"
          alt="logo"
          width="30%"
          className={style.header_logo}
        />
        <div
          className={`d-flex align-items-center justify-content-between ${style.header_right}`}
        >
          <h6
            className="m-0"
            onClick={() => navigate("/about-us")}
            role="button"
          >
            ABOUT US
          </h6>
          <div className="gap-3 justify-content-round d-flex">
            {user?.message === "Loggin successfully" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <h4 className="m-0">{user?.findUser?.username}</h4>
                <RiLogoutBoxRFill
                  style={{ fontSize: "2rem" }}
                  role="button"
                  onClick={handleLogOut}
                />
              </div>
            ) : (
              <>
                <button onClick={() => navigate("/login")}>Log in</button>
                <button onClick={() => navigate("/signup")}>Register </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
