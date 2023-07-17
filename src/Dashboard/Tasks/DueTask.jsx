import { useState, useEffect } from "react";

const DueTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://task-pro-server.vercel.app/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const completedTasks = tasks.filter((task) => task.status === "due");

  return (
    <div>
      <p className="text-center text-4xl mx-auto ms-5 font-extrabold">
        Due Tasks
      </p>

      <div>
        <table className="table">
          <thead>
            <tr className="text-xl">
              <th>Task</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody className="text-xl">
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

export default DueTask;
