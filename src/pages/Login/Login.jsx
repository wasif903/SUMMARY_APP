import React, { useState } from "react";
import style from "./login.module.css";
import { Container } from "react-bootstrap";
import gif from "../../assets/Login/login_bg.gif";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/Auth/auth";
import logo from "../../assets/logo.png";

const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const [loginfields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = loginfields;

  const loginFieldsState = (e) => {
    setLoginFields({ ...loginfields, [e.target.name]: e.target.value });
  };

  const [login] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginfields);
      if (!res.error) {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      } else {
        alert("error");
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
        style={{zIndex:"99999"}}
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
            height: "100%",
            filter: "blur(20px)",
            width: "50rem",
          }}
          className={style.login_bg}
        />
        <div className={style.login_fields_wrapper}>
          <img src={logo} alt="" className={style.logo} />
          <h3>LOGIN FORM</h3>
          <form className={style.form} method="POST" onSubmit={handleLogin}>
            <label className={style.label}>
              <h6>Email</h6>
              <div className={style.password_fields}>
                <input
                  type="text"
                  placeholder="Email"
                  className={style.password_input}
                  name="email"
                  onChange={loginFieldsState}
                  value={email}
                />
              </div>
            </label>

            <label className={style.label}>
              <h6>Password</h6>
              <div className={style.password_fields}>
                <input
                  type="password"
                  placeholder="Min. 8 Characters"
                  className={style.password_input}
                  name="password"
                  onChange={loginFieldsState}
                  value={password}
                />
              </div>
            </label>
            <div className={style.logged_forget_wrapper}>
              <div className={style.logged_in}>
                <input type="checkbox" /> <p>Remember Me</p>
              </div>
              <div className={style.logged_in}>
                <input type="checkbox" /> <p>Hear From Us</p>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button className={style.signin_btn}>Sign In</button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
