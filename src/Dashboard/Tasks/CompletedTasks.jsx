import React, { useState, useEffect } from "react";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://taskpro-server-sahariarsupto.vercel.app/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div>
      <p className="text-center text-xl mx-auto sm:ms-5 sm:font-extrabold sm:text-4xl">
        Completed Tasks
      </p>

      <div>
        <table className="table w-4/5">
          <thead>
            <tr className="text-xs sm:text-xl ">
              <th>Task</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-xl">
            {completedTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.creationDate}</td>
                <td>{task.deadline}</td>
                <td>{task.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedTasks;
