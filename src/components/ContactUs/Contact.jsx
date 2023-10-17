import React, { useEffect, useState } from "react";
import Contact_us_gif from "../../assets/contactUs/side_img.gif";
import style from "./contactus.module.css";
import { Container } from "react-bootstrap";
import right_chain from "../../assets/contact_right_chain.png";
import { useContactMutation } from "../../../redux/Auth/auth";

const Contact = () => {
  const [query, setQuery] = useState("");
  const [fields, setFields] = useState({
    userEmail: "",
    firstName: "",
    lastName: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const { userEmail, firstName, lastName, message } = fields;

  const onChangeHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const [contact] = useContactMutation();

  const onSubmit = async () => {
    try {
      if (!userEmail || !firstName || !lastName || !message) {
        alert("All Fields Are Required");
      } else {
        const res = await contact({
          query,
          userEmail,
          firstName,
          lastName,
          message,
        });
        if (!res.error) {
          alert("Contact successfully");
          setSuccess("sent");
          setFields({
            userEmail: "",
            firstName: "",
            lastName: "",
            message: "",
          });
        } else {
          setSuccess("error");
        }
      }
    } catch (error) {
      setSuccess("error");
      console.log(error);
      alert("Sometihng Went Wrong Error");
    }
  };

  useEffect(() => {
    if (success !== "") {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  console.log(success);
  console.log(query);

  return (
    <section className={style.Contact_us_wrapper}>
      <img src={Contact_us_gif} alt="no img found" className={style.gif_img} />
      <div className={style.contact_us_right}>
        <img src={right_chain} alt="" className={style.right_img} />
        <Container className={style.contact_us_container}>
          <div>
            <h1 style={{ color: "black" }}>Contact Us</h1>
            <p style={{ color: "white" }}>
              If you have any questions, suggestions, or feedback, please don't
              hesitate to reach out to us. We value your input and are committed
              to enhancing your experience with YouSummarise.
            </p>
          </div>
          <select
            defaultValue="Question or Feedback"
            className={style.Contact_select}
            onChange={(e) => setQuery(e.target.value)}
          >
            <option defaultValue="Question or Feedback">
              Question or Feedback
            </option>
            <option value="Question"> Question</option>
            <option value="Feedback">Feedback</option>
          </select>
          <div className={style.contact_us_fields}>
            <input
              type="text"
              placeholder="Enter your email..."
              className={style.input2}
              name="userEmail"
              value={fields.userEmail}
              onChange={onChangeHandler}
            />
          </div>

          <div className={style.contact_us_fields}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={fields.firstName}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={fields.lastName}
              onChange={onChangeHandler}
            />
          </div>
          <div className={style.contact_us_fields}>
            <textarea
              type="text"
              placeholder="Message..."
              className={style.input2}
              name="message"
              value={fields.message}
              onChange={onChangeHandler}
              rows="5"
              color="5"
            />
          </div>
          <span className={success === "" ? "d-none" : ""}>
            {success === "sent" ? (
              <p className="fw-bold text-white">Message Sent Successfully!</p>
            ) : (
              <p className="fw-bold text-white">
                Couldn't Send Message, Try Again Later
              </p>
            )}
          </span>
          <button onClick={onSubmit} className={style.contact_us_btn}>
            Submit
          </button>
        </Container>
      </div>
    </section>
  );
};

export default Contact;
