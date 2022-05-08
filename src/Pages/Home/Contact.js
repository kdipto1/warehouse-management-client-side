import React from "react";
import "./Contact.module.css";

const Contact = () => {
  return (
    <div className="contact mt-4">
      <h2 className="text-center">Contact Us:</h2>
      <div className="container w-75 contact-container">
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your first name.."
          />
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
          />
          <input
            type="text"
            id="pnumber"
            name="phone"
            placeholder="Your phone number.."
          />
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            style={{ height: "180px" }}
          ></textarea>
          <input className="mb-2 home-button d-block mx-auto" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
