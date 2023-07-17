import React, { useState } from "react";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://taskpro-server-sahariarsupto.vercel.app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          creationDate,
          deadline,
          comment,
          status,
        }),
      });

      if (response.ok) {
        // Reset the form
        setTaskName("");
        setCreationDate("");
        setDeadline("");
        setComment("");
        setStatus("");

        setSuccess(true);
        console.log("Task created successfully");
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <div className="ms-12 justify-center items-center mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-700 mb-5">Add Task</h2>
      <form className="grid grid-cols-1 gap-7 text-xs sm:grid-cols-3 sm:text-xl" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            placeholder="Type here"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="creationDate">Creation Date:</label>
          <input
            type="text"
            id="creationDate"
            placeholder="Type here"
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="text"
            id="deadline"
            placeholder="Type here"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            placeholder="Type here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          >
            <option value="">Select status</option>
            <option value="due">Due</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="btn btn-warning" type="submit">Add</button>
      </form>
      {success && (
        <div>
          <dialog id="my_modal_1" className="modal" open>
            <form method="dialog" className="modal-box bg-[#38bdf8]">
              <h3 className="font-bold text-lg">Task Added</h3>
              <p className="py-4">Press ESC key or click the button below to close</p>
              <div className="modal-action">
                <button className="btn btn-warning" onClick={closeModal}>
                  Close
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default AddTask;
