import React, { useState } from "react";
import style from "./signup.module.css";
import { Container } from "react-bootstrap";
import gif from "../../assets/login/login_bg.gif";
import { useNavigate } from "react-router-dom";
import { useSign_upMutation } from "../../../redux/Auth/auth";
import logo from "../../assets/logo.png";

const Signup = () => {
  const [confirmFields, setConfirmFields] = useState("");
  const [signUpfields, setsignUpFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = signUpfields;

  const navigate = useNavigate();

  const handlefields = (e) => {
    setsignUpFields({ ...signUpfields, [e.target.name]: e.target.value });
  };

  const [sign_up] = useSign_upMutation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (confirmFields === password) {
        const res = await sign_up(signUpfields);
        if (!res.error) {
          navigate("/login");
        } else {
          alert("error");
        }
      } else {
        alert("Passwords do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.login_wrapper}>
      <div className={style.white_box}></div>
      <div className={style.red_box}></div>
      <h6
        className={style.Login_back}
        onClick={() => navigate("/")}
        role="button"
        style={{ zIndex: "99999" }}
      >
        BACK
      </h6>
      <Container className={style.login_container_wrapper}>
        <img
          src={gif}
          alt="no img found"
          style={{
            objectFit: "contain",
            position: "absolute",
            filter: "blur(20px)",
            height: "100%",
            width: "50rem",
          }}
          className={style.login_bg}
        />
        <div className={style.login_fields_wrapper}>
          <img src={logo} alt="" className={style.logo} />

          <form className={style.form_sign} onSubmit={handleSignUp}>
            <h3 style={{ color: "white", fontWeight: "400" }}>
              REGISTRATION FORM
            </h3>
            <label>
              <h6>Name</h6>
              <div className={style.divtext}>
                <input
                  type="text"
                  placeholder="Your name"
                  className={style.textfiled}
                  name="username"
                  value={username}
                  onChange={handlefields}
                />
              </div>
            </label>
            <label>
              <h6>Email</h6>
              <div className={style.divtext}>
                <input
                  type="text"
                  placeholder="Your email address"
                  className={style.textfiled}
                  name="email"
                  value={email}
                  onChange={handlefields}
                />
              </div>
            </label>
            <label>
              <h6>Password</h6>
              <div className={style.divtext}>
                <input
                  type="password"
                  placeholder="Your password"
                  className={style.textfiled}
                  name="password"
                  value={password}
                  onChange={handlefields}
                />
              </div>
            </label>
            <label>
              <h6>Confirm Password</h6>
              <div className={style.divtext}>
                <input
                  type="password"
                  placeholder="Re-Type password"
                  className={style.textfiled}
                  value={confirmFields}
                  onChange={(e) => setConfirmFields(e.target.value)}
                />
              </div>
            </label>
            <button className={style.btn_register}>Register</button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
