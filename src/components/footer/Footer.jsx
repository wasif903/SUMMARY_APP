import React from "react";
import style from "./footer.module.css";
import { Container } from "react-bootstrap";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const homepage = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const aboutuspage = () => {
    navigate("/about-us");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={style.footer_wrapper}>
        <Container fluid className={style.footer_container}>
          <div className={style.footer_main}>
            <div className={style.footer_div}>
              <div className={style.footer_logo}>
                <div className={style.social_logo}>
                  <img
                    src={logo}
                    width="70%"
                    className={style.footer_creater_name}
                    alt="logo"
                  />
                  <div className="d-flex gap-5 py-3">
                    <p>
                      <a
                        href="https://www.instagram.com/yousummarise/"
                        target="_blank"
                        className="text-reset"
                      >
                        <BsInstagram />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.footer_middle_div}>
                <div className={style.our_services}>
                  <h3>Company</h3>
                  <ul>
                    <li role="button" onClick={homepage}>
                      Home
                    </li>
                    <li role="button" onClick={aboutuspage}>
                      About Us
                    </li>
                  </ul>
                </div>
                <div className={style.company}>
                  <h3>Legal</h3>
                  <ul>
                    <li role="button">Terms Of Use</li>
                    <li role="button">Privacy Policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={style.copyright}>
        <p>Copyright 2023 @yousummarise all right reserved </p>
      </div>
    </>
  );
};

export default Footer;
