import { useState } from "react";
import image from "./help.svg";

const Touch = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a message object to send in the POST request
    const messageData = {
      name,
      email,
      message
    };

    // Perform a POST fetch request to send the message
    fetch("https://task-pro-server.vercel.app/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageData)
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Message sent successfully");
        
          setName("");
          setEmail("");
          setMessage("");
        } else {
          throw new Error("Failed to send message");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-5 mt-5">Get in Touch</h2>
      <div className="grid grid-cols-1  justify-center items-center sm:grid-cols-2">
        <div className="w-4/5 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-semibold text-2xl">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-semibold text-2xl">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-semibold text-2xl">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
          {successMessage && (
            <div className="mt-5 alert alert-success">
              <span>{successMessage}</span>
            </div>
          )}
        </div>
        <div>
          <img className="w-4/5" src={image} alt="" />
        </div>
      </div>
    </>
  );
};

export default Touch;
