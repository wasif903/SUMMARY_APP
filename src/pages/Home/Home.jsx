import React, { useEffect, useRef, useState } from "react";
import style from "./home.module.css";
import { Container } from "react-bootstrap";
import img_one from "../../assets/slider/img_one.png";
import img_two from "../../assets/slider/img_two.png";
import img_three from "../../assets/slider/img_three.png";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import svg_one from "../../assets/Third_Section/third_section_one_img.svg";
import svg_two from "../../assets/Third_Section/third_section_img_two.svg";
import svg_three from "../../assets/Third_Section/third_section_img_three.svg";
import Contact from "../../components/ContactUs/Contact";
import img_rob from "../../assets/img_rob.png";
import main_gif from "../../assets/main_gif.gif";
import ytGiff from "../../assets/ytGif.gif";
import back from "../../assets/back.svg";
import linkSvg from "../../assets/link.svg";
import Spinner from "react-bootstrap/Spinner";
import { Autoplay } from "swiper/modules";
import Form from "react-bootstrap/Form";
import "swiper/element/css/autoplay"; // Import Swiper CSS
import refreshIcon from "../../assets/refreshIcon.jpg";

import axios from "axios";
import API_BASE_URL from "../../config";
import CopyToClipboard from "react-copy-to-clipboard";
const faqs = [
  {
    question: "What types of videos can be summarised?",
    answer:
      "Currently, we only support YouTube video links. In the future, we may support other video platforms. ",
  },

  {
    question:
      "Why did I receive an error message that states a summary cannot be provided?",
    answer:
      "Due to copyright law, we can only summarise non-copyrighted content in the free model. ",
  },
  {
    question: "Are the summaries 100% accurate?",
    answer:
      "While we cannot guarantee 100% accuracy in our AI-generated summaries, we aim to provide useful, high-quality responses to the best of our abilities.",
  },
  {
    question: "Can the tool summarise in other languages?",
    answer:
      "Currently, all summaries are in English. We are working on adding other languages in the future.",
  },
];

const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  400: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  786: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};

const slider_img = [
  img_one,
  img_two,
  img_three,
  img_one,
  img_two,
  img_three,
  img_one,
  img_two,
  img_three,
];
const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSummary, setIsSummary] = useState(false);

  // api states
  const [check, setCheck] = useState("");
  const [url, seturl] = useState("");
  const [keyPoints, setKeyPoints] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);

  const [onSubmit, setonSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [ytData, setYtData] = useState("");
  const [keyPointData, setKeyPointData] = useState([]);

  const [err, setErr] = useState("");

  const [currCount, setCurrCount] = useState(null);

  const [vidURL, setVidURL] = useState("");

  const handleCopy = () => {
    try {
      if (check !== "points") {
        navigator.clipboard.writeText(ytData);
      } else if (check === "points"){
        const data = keyPointData.map(item => item.point)
        navigator.clipboard.writeText(`${data}`)
      }else {
        const formattedText = keyPointData
        .map((item) => `${item.index}. ${item.point}`)
        .join("\n");
      navigator.clipboard.writeText(formattedText);
      }
    } catch (error) {
      // Handle any clipboard-related errors here
      console.error("Clipboard error:", error);
    }
  };

  const handleCopySuccess = () => {
    setCopied(true);
  };



  const handleToggleDark = () => {
    setIsDark(!isDark);
    localStorage.setItem("darkmode", isDark);
  };

  const handleSubmit = async () => {
    if (url && (keyPoints || wordCounter)) {
      try {
        setisLoading(true);

        if (check === "paragraph") {
          const paraFormData = new FormData();
          paraFormData.append("vidURL", url);
          paraFormData.append("contentType", check);
          paraFormData.append("wordCounter", wordCounter);

          const res = await axios.post(
            `${API_BASE_URL}/api/summary`,
            paraFormData
          );

          setYtData(res.data);

          if (res.status === 200) {
            setisLoading(false);
            setIsSummary(true);
            seturl("");
            setKeyPoints(0);
            setWordCounter(0);
          }else {
            console.log(res)
          }

          setKeyPoints(null);
          setonSubmit(true);
        } else if (check === "points") {
          const pointsFormData = new FormData();
          pointsFormData.append("vidURL", url);
          pointsFormData.append("contentType", check);
          pointsFormData.append("keyPoints", keyPoints);

          const res = await axios.post(
            `${API_BASE_URL}/api/summary`,
            pointsFormData
          );

          setKeyPointData(res.data);
          setWordCounter(null);
          setonSubmit(true);

          if (res.status === 200) {
            setisLoading(false);
            setIsSummary(true);
            seturl("");
            setKeyPoints(0);
            setWordCounter(0);
          }
        } else {
          setisLoading(false);
          alert("Invalid Request");
        }
      } catch (error) {
        setisLoading(false);
        setIsSummary(true);
        setErr("Video Is Copyrighted, Please Try With A Different Link");
        console.log(error);
      }
    } else {
      alert("Make Sure All The Fields Are Selected");
    }
  };

  useEffect(() => {
    const timerId = setInterval(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/get-counter`);
        if (res.status === 200) {
          setCurrCount(res.data);
        }
      } catch (error) {
        console.log(error);
        // alert("Alert Error");
      }
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const handleReset = () => {
    setIsSummary(false);
    setCheck("");
    seturl("");
    setKeyPoints(0);
    setWordCounter(0);
    setVidURL("");
    window.location.reload(false);
  };

  const handleOnURlChange = (e) => {
    seturl(e.target.value);
    setVidURL(e.target.value);
  };

  return (
    <div>
      <div className={style.white_box}></div>
      <div className={style.red_box}></div>
      <Header />
      <section className={style.main_wrapper}>
        <Container className={style.main_container}>
          <img
            src={main_gif}
            alt="no img"
            style={{
              position: "absolute",
              zIndex: "1",
              width: "70%",
              filter: "blur(20px)",
            }}
            className={style.main_container_bg}
          />
          <div
            className={style.bannerAnimatedTxt}
            style={{ zIndex: "20", width: "100%" }}
          >
            <div id="animated-text-container">
              <h2 className="display-3">
                <span>Learn</span> <span>more</span> <span>in</span>{" "}
                <span>less</span> <span>time</span> <span> with </span>{" "}
                <span> AI-powered</span>{" "}
                <span style={{ color: "red" }}>summaries</span>
              </h2>
            </div>

            <div className={`pt-5 ${style.text_url}`}>
              <div className={style.inputFields}>
                <span className="ps-3">
                  <img src={linkSvg} alt="" />
                </span>
                <input
                  type="text"
                  placeholder="www.youtube.com/watch?example"
                  onChange={handleOnURlChange}
                  value={url}
                />
              </div>
              {isLoading ? (
                <div className={style.loader}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <>
                  <div className="d-flex d-sm-inline-flex">
                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Summarise
                    </button>

                    <button
                      onClick={() => {
                        handleReset();
                      }}
                      style={{ width: "50px" }}
                    >
                      <img src={refreshIcon} width="25px" alt="" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className={style.options_btn}>
              {/* <button
                className={check === "points" ? style.cond : ""}
                onClick={() => setCheck("paragraph")}
              >
                Text
              </button> */}
              <select
                defaultValue="Select Range"
                className={
                  check !== "paragraph" && check !== ""
                    ? `${style.cond} ${style.Contact_select}`
                    : style.Contact_select
                }
                onChange={(e) => {
                  setWordCounter(e.target.value);
                  setCheck("paragraph");
                }}
              >
                <option defaultValue="Select Range" className={style.options}>
                  Text
                </option>
                <option value={3000} className={style.options}>
                  {" "}
                  Short
                </option>

                <option value={5000} className={style.options}>
                  Medium
                </option>
                <option value={10000} className={style.options}>
                  Long
                </option>
              </select>

              <div>
                <select
                  value={keyPoints}
                  className={
                    check === "paragraph"
                      ? `${style.cond} ${style.Contact_select}`
                      : style.Contact_select
                  }
                  onClick={() => setCheck("points")}
                  onChange={(e) => {
                    setKeyPoints(e.target.value);
                  }}
                >
                  <option value="keyPoints" className={style.options}>
                    Bullet Points
                  </option>
                  <option value="5" className={style.options}>
                    5
                  </option>
                  <option value="10" className={style.options}>
                    10
                  </option>
                  <option value="15" className={style.options}>
                    15
                  </option>
                  <option value="30" className={style.options}>
                    30
                  </option>
                </select>
              </div>

              {check === "paragraph" ? (
                <div className="d-none">
                  <select
                    defaultValue="Question or Feedback"
                    className={style.Contact_select}
                    onChange={(e) => setWordCounter(e.target.value)}
                  >
                    <option
                      defaultValue="Select Range"
                      className={style.options}
                    >
                      Select Range
                    </option>
                    <option value={1000} className={style.options}>
                      {" "}
                      Short
                    </option>
                    <option value={1200} className={style.options}>
                      Medium
                    </option>
                    <option value={1500} className={style.options}>
                      Long
                    </option>
                  </select>
                </div>
              ) : check === "" ? (
                <div className="d-none">
                  <button
                    onClick={() => {
                      setWordCounter(30);
                      setKeyPoints(null);
                    }}
                  >
                    Short
                  </button>
                  <button
                    onClick={() => {
                      setWordCounter(35);
                      setKeyPoints(null);
                    }}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => {
                      setWordCounter(40);
                      setKeyPoints(null);
                    }}
                  >
                    Long
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            {isSummary ? (
              <div
                className={style.summary}
                style={
                  isDark
                    ? {
                        background: "black",
                        color: "white",
                        borderColor: "grey",
                      }
                    : {
                        background: "white",
                        color: "black",
                        borderColor: "white",
                      }
                }
              >
                <div
                  className={`${style.summary_heading} d-flex mb-2 align-items-center justify-content-between`}
                >
                  <h4
                    style={{ fontWeight: "800" }}
                    className="m-0  d-flex align-items-center justify-content-between"
                  >
                    Here is your Summary{" "}
                  </h4>
                  <div className={` d-flex align-items-center gap-3`}>
                    <Form style={{ fontSize: "1.2rem", cursor: "pointer" }}>
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        onChange={() => setIsDark(!isDark)}
                        style={{ cursor: "pointer" }}
                      />
                    </Form>
                  </div>
                </div>
                <div className={style.summary_inside}>
                  {ytData ? (
                    <p style={{ height: "10rem", overflow: "auto" }} id="text">
                      {ytData === "" ? (
                        <h6 className="py-2 text-center">
                          {" "}
                          {err !== ""
                            ? err
                            : "Sorry, Couldn't able to read the data"}
                        </h6>
                      ) : ytData !== "" ? (
                        `Here is your summary ${vidURL}   ${ytData}`
                      ) : keyPointData.length !== 0 ? (
                        keyPointData.map((item, index) => (
                          <>
                            <span>Here is your summary ${vidURL}</span>
                            <p
                              style={{ marginBottom: "0.5rem" }}
                              key={index}
                              id="text"
                              // ref={textAreaRef}
                            >
                              {index + 1}.{" "}
                              <span className="ms-3">{item.point}</span>
                            </p>
                          </>
                        ))
                      ) : null}
                    </p>
                  ) : keyPointData.length !== 0 ? (
                    <div>
                      <span>Here is your summary {vidURL}</span>
                      {keyPointData.map((item, index) => (
                        <p
                          style={{ marginBottom: "0.5rem" }}
                          key={index}
                          id="text"
                          // ref={textAreaRef}
                        >
                          {index + 1}.{" "}
                          <span className="ms-3">{item.point}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <h6 className="py-2 text-center">
                      {" "}
                      {err !== ""
                        ? err
                        : "Sorry, Couldn't able to read the data"}
                    </h6>
                  )}

                  <div style={{ display: "flex" }}>
                    <button
                      onClick={handleCopy}
                      style={
                        isDark
                          ? {
                              background: "black",
                              color: "white",
                            }
                          : {
                              background: "white",
                              color: "black",
                            }
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="37"
                        height="40"
                        viewBox="0 0 37 40"
                        fill="none"
                      >
                        <path
                          d="M35.0343 27.6113C35.0343 32.8074 35.0343 35.4045 33.4198 37.019C31.8072 38.6316 29.2082 38.6316 24.0139 38.6316H12.9935C7.79926 38.6316 5.20028 38.6316 3.58763 37.019C1.97314 35.4027 1.97314 32.8074 1.97314 27.6113V22.1011M25.8506 5.57416C29.8455 5.5962 32.0092 5.77436 33.4198 7.18497C35.0343 8.79946 35.0343 11.3966 35.0343 16.5909V20.2643M11.1568 5.57416C7.16191 5.5962 4.99824 5.77436 3.58763 7.18497C2.17518 8.59558 1.99886 10.7592 1.97682 14.7541M12.9935 30.3664H24.0139"
                          stroke="#676767"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11.1567 4.65207C11.1567 3.92137 11.447 3.2206 11.9637 2.70392C12.4804 2.18724 13.1811 1.89697 13.9118 1.89697H23.0955C23.8262 1.89697 24.527 2.18724 25.0436 2.70392C25.5603 3.2206 25.8506 3.92137 25.8506 4.65207V6.4888C25.8506 7.2195 25.5603 7.92027 25.0436 8.43695C24.527 8.95363 23.8262 9.2439 23.0955 9.2439H13.9118C13.1811 9.2439 12.4804 8.95363 11.9637 8.43695C11.447 7.92027 11.1567 7.2195 11.1567 6.4888V4.65207Z"
                          stroke="#676767"
                          strokeWidth="2"
                        />
                        <path
                          d="M11.1568 23.9377H12.9935M25.8506 23.9377H18.5037M27.6874 17.5092H24.0139M18.5037 17.5092H9.32007"
                          stroke="#676767"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Copy Text
                    </button>
                    <button
                      style={
                        isDark
                          ? {
                              background: "black",
                              color: "white",
                            }
                          : {
                              background: "white",
                              color: "black",
                            }
                      }
                    ></button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
      <section className={`pt-5 ${style.how_sum_wrapper}`}>
        <Container
          className={style.how_sum_container}
          style={{ display: "flex" }}
        >
          <div className={style.how_sum} style={{ zIndex: "10" }}>
            <div style={{ zIndex: "10" }} className="text-lg-start text-center">
              <img src={img_rob} alt="Robot image" className={style.robo_img} />
            </div>
            <div className={style.right_box}>
              <h1 style={{ color: "white" }}>
                Get Summaries in{" "}
                <strong style={{ color: "red" }}>THREE EASY STEPS :</strong>{" "}
              </h1>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid red",
                      borderRadius: "4px",
                      marginBottom: "3rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        border: "1px solid red",
                        rotate: "20deg",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          color: "red",
                          rotate: "-20deg",
                          margin: "0",
                        }}
                      >
                        01
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "white",
                      textAlign: "center",
                      margin: "2.4rem 0 0 2rem ",
                    }}
                  >
                    <p>
                      Copy and Paste a YouTube video URL Link into the input
                      field.{" "}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid red",
                      borderRadius: "4px",
                      marginBottom: "3rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        border: "1px solid red",
                        rotate: "20deg",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          color: "red",
                          margin: "0",
                          rotate: "-20deg",
                        }}
                      >
                        02
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "white",
                      margin: "2rem 0 0 2rem",
                    }}
                  >
                    <p>
                      Choose your desired summary format: Bullet Points or Text.
                      Specify the length/amount of details. <br /> A. For Bullet
                      Points: select the number of points <br />{" "}
                      B. For Text : choose Short, Medium or
                      Long
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid red",
                      borderRadius: "4px",
                      marginBottom: "3rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        border: "1px solid red",
                        rotate: "20deg",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          color: "red",
                          rotate: "-20deg",
                          margin: "0",
                        }}
                      >
                        03
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "white",
                      margin: "2.4rem 0 0 2rem ",
                    }}
                  >
                    <p>
                      Click the Summarise button and the AI will generate a
                      concise summary based on your selections. Copy the output
                      summary as needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* Third Section */}
      <section className={style.third_section_wrapper}>
        <Container className={style.third_sec_container}>
          <div>
            <img src={svg_one} alt="no img" />
            <h3>Maximise Learning Efficiency</h3>
            <p>
              Summaries deliver key concepts more efficiently than full videos,
              empowering you to extract insights from a wider range of content.
              You can then strategically revisit only the most relevant videos.
            </p>
          </div>
          <div>
            <img src={svg_two} alt="no img" />
            <h3>Boost Retention of Essentials</h3>
            <p>
              By eliminating extraneous details, summaries streamline core
              concepts for deeper comprehension and improved retention.
            </p>
          </div>
          <div>
            <img src={svg_three} alt="no img" />
            <h3 className="spaci">Take Charge of Your Learning</h3>
            <p>
              Distilling concepts to their essence, summaries put you in control
              of customising your learning path based on your unique needs and
              interests.
            </p>
          </div>
        </Container>
      </section>
      {/* summarise Animation */}
      <span className={style.scroll_text}>
        <div className={style.marquee}>
          <div>
            <h1>
              * you summarise * you summarise * you summarise* you summarise *
              you summarise * you summarise* you summarise * you summarise * you
              summarise
            </h1>
          </div>
        </div>
        <div className={style.marquee_second}>
          <div>
            <h1 className={style.marquee_second_para}>
              * you summarise * you summarise * you summarise* you summarise *
              you summarise * you summerise* you summarise * you summarise * you
              summarise
            </h1>
          </div>
        </div>
        <img src={ytGiff} className={style.ytGiff} alt="" />
      </span>

      {/*  */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          background: "black",
        }}
        className="py-5 px-5"
      >
        <div className="d-flex align-items-center">
          <h2
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "400",
              fontFamily: "DS Digital",
            }}
            className={style.heading_sec}
          >
            Summaries{" "}
            <strong
              style={{
                color: "red",
                fontFamily: "DS Digital",
                fontWeight: "400",
              }}
            >
              Generated
            </strong>
          </h2>
        </div>
        <div
          className={`d-flex justify-content-center align-items-center ${style.second_heading}`}
        >
          {currCount ? currCount : 0}
        </div>
      </div>

      {/*  */}

      {/* <!-- FAQ,s Area...... --> */}
      <section className={style.section_five_wrapper}>
        <Container className={style.faqs_container}>
          <h1>FAQ</h1>

          <div className={style.faq}>
            {faqs.map((ans, index) => (
              <div
                style={{
                  padding: "1rem 0rem",
                  position: "relative",
                  borderTop: "1px solid white",
                }}
                key={index}
              >
                <input
                  type="checkbox"
                  id={index}
                  name="q"
                  className={style.questions}
                />
                <label className={style.question}>
                  <div
                    className="d-flex align-items-center pe-5 w-100"
                    style={{
                      position: "relative",
                    }}
                  >
                    <h5 className="m-0">{ans.question}</h5>
                    <label htmlFor={index}>
                      <img src={back} alt="" className={style.plus} />
                    </label>
                  </div>
                </label>
                <div className={style.answers}>{ans.answer}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* <!-- Contact-us Area...... --> */}
      <Contact />
      {/* {Organization area} */}
      
      <section className={style.section_two_wrapper}>
        <Swiper
          breakpoints={breakpoints}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className={style.section_two_swiper}
        >
          {slider_img.map((img, index) => (
            <SwiperSlide
              style={{
                // width: "auto",
                padding: "0rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // height: "auto",
              }}
              key={index}
            >
              {index === 1 || index === 4 || index === 7 ? ( // Check if it's the first image
                <a
                  href="https://www.shhs.gdst.net/news/atherton-award/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={img}
                    style={{
                      width: "9rem",
                      height: "11rem",
                      // objectFit: "cover",
                    }}
                    alt="brand images"
                    // className={style.section_two_swiper_images}
                  />
                </a>
              ) : (
                <img
                  src={img}
                  style={{
                    width: "9rem",
                    height: "11rem",
                    // objectFit: "cover",
                  }}
                  alt="brand images"
                  // className={style.section_two_swiper_images}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
