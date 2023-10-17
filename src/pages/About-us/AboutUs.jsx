import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/ContactUs/Contact";
import { Container } from "react-bootstrap";
import style from "./aboutus.module.css";
// import uppergif from "../../assets/login/login_bg.gif";
import team_img_one from "../../assets/main_gif.jpeg";
import team_img_two from "../../assets/team/about_team_two.png";
import main_gif from "../../assets/main_gif.gif";
import img_b from "../../assets/about_main.png";
import linkdin from "../../assets/linkdin.png";
import { BsLinkedin } from "react-icons/bs";
import left_chain from "../../assets/about_chain_left.png";
import right_chain from "../../assets/about_chain_right.png";

const AboutUs = () => {
  return (
    <div>
      <div className={style.white_box}></div>
      <div className={style.red_box}></div>
      <img src={left_chain} alt="" className={style.about_chain_left} />
      <img src={right_chain} alt="" className={style.about_chain_right} />
      <Header />
      {/* OUR mission */}
      <section className={style.mission_wrapper}>
        <Container className={style.mission_container}>
          <img
            // src={uppergif}
            alt="no img found"
            style={{
              objectFit: "contain",
              position: "absolute",
              height: "100%",
              filter: "blur(20px)",
              width: "100%",
            }}
            className={style.login_bg}
          />
          <div className={style.mission}>
            <div>
              <img
                src={img_b}
                alt="Image not found"
                className={style.imgbrain}
              />
            </div>
            <div className={style.mission_right}>
              <h5 style={{ color: "red" }}>About Us</h5>
              <h1 style={{ color: "white" }}>
                OUR <strong style={{ color: "red" }}>MISSION</strong>
              </h1>
              <p style={{ color: "white", fontWeight: "100" }}>
                Friends and innovators Mira and Tomas bonded over a shared
                frustration - the inefficiency of self-directed research. After
                meeting at an entrepreneurship programme in Silicon Valley in
                2022, they realised they could combine their complementary
                skills to help students better manage the flood of online
                information.
              </p>
              <p
                style={{
                  color: "white",
                  marginTop: "-1rem",
                  fontWeight: "100",
                }}
              >
                Witnessing their own and peers' waste of countless hours
                watching inconsistent, sometimes unreliable videos, they founded
                YouSummarise on a mission to put the student in control. By
                synthesising key insights from lengthy videos into accessible
                summaries, their platform allows learners to quickly evaluate
                resources and spend time only on content that drives deeper
                understanding. With YouSummarise, students can optimise their
                study time, boost retention of core concepts, and customise
                their learning path. By cutting through the noise, YouSummarise
                empowers students to get the most out of their research and in
                turn deepen their knowledge on a topic.
              </p>
            </div>
          </div>
        </Container>
      </section>
      {/* meet team */}
      <section className={style.team_wrapper}>
        <Container className={style.team_container}>
          <img src={main_gif} alt="no img found" className={style.maingif} />
          <h1 style={{ zIndex: "10" }}>
            Meet the <strong>team</strong>
          </h1>
          <div className={style.team_box_wrapper}>
            <div className={style.team_box}>
              <img src={team_img_one} alt="" />

              <h3>
                Mira Bhandari
                <a
                  href="https://www.linkedin.com/in/mira-bhandari-60b335228"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  <BsLinkedin className={style.logo} />
                </a>
              </h3>
              <h4 className={style.cofounder}>Co-Founder</h4>
              <p>
                Mira Bhandari is a co-founder of YouSummarise and an ambitious
                entrepreneur who integrates innovation into her academic
                pursuits. Currently a student at South Hampstead High School in
                the UK, she complements her STEM skills with artistic
                endeavours, singing in choirs and competing internationally in
                dance. Mira develops technological solutions to enrich her
                school and community while spearheading sustainability
                initiatives to reduce carbon footprints. Whether launching
                startups, performing on stage, or inventing eco-friendly
                solutions, she leverages her diverse skills to drive change.
              </p>
            </div>
            <div className={style.team_box}>
              <img src={team_img_two} alt="" />
              <h3>
                Tomas Lopez-Valcarcel
                <a
                  href="https://www.linkedin.com/in/tomaslv"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  <BsLinkedin className={style.logo} />
                </a>
              </h3>
              <h4 className={style.cofounder}>Co-Founder</h4>
              <p>
                Tomas Lopez-Valcarcel is a co-founder of YouSummarise and a
                passionate student entrepreneur who blends academics with
                innovation. Currently studying at Eton College in the UK, he
                deeply engages with computer science while also pursuing
                creative interests in theater lighting and sailing open waters.
                Driven by curiosity, he looks for opportunities to problem-solve
                and create positive change through technology, embodying the
                belief that innovation knows no boundaries - whether in the
                world of code, the art of lighting, or the serenity of the open
                sea.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutUs;
