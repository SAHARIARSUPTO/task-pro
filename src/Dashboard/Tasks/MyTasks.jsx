import React, { useState, useEffect } from 'react';

const TaskRow = ({ task, users, initialUser, onUserSelect, onDeleteTask }) => {
  const [selectedUser, setSelectedUser] = useState(initialUser);

  const handleUserSelect = (event) => {
    const user = event.target.value;
    setSelectedUser(user);
    onUserSelect(task._id, user);
  };

  const handleDelete = () => {
    onDeleteTask(task._id);
  };

  return (
    <tr key={task._id}>
      <td>{task.taskName}</td>
      <td>{task.creationDate}</td>
      <td>{task.deadline}</td>
      <td>{task.comment}</td>
      <td>
        <select value={selectedUser || ''} onChange={handleUserSelect}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user.displayName}>
              {user.displayName}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button className="btn btn-warning" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedTasks, setSearchedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    const savedUsers = localStorage.getItem('selectedUsers');
    if (savedUsers) {
      setSelectedUsers(JSON.parse(savedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
  }, [selectedUsers]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://task-pro-server.vercel.app/tasks');
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://task-pro-server.vercel.app/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelect = (taskId, user) => {
    setSelectedUsers((prevSelectedUsers) => ({
      ...prevSelectedUsers,
      [taskId]: user,
    }));
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://task-pro-server.vercel.app/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccess(true);
        fetchTasks();
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredTasks = tasks.filter((task) =>
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedTasks(filteredTasks);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchedTasks([]);
  };

  if (loading) {
    return <span className="loading loading-spinner justify-center text-center items-center loading-lg"></span>;
  }

  return (
    <>
      <p className="text-center text-4xl mx-auto ms-5 font-extrabold mb-10 sm:mb-0">All Tasks</p>
      <div className="flex h-screen">
        <div className="overflow-x-auto text-xl">
          <div className="flex mb-4 me-5">
            <div>
              <input
                type="text"
                placeholder="Search by task name"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="ms-10 px-4 py-2 border border-black bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <button
                className="btn btn-warning mx-2"
                onClick={handleSearch}
                disabled={!searchTerm}
              >
                Search
              </button>
              <button className="btn btn-secondary" onClick={clearSearch}>
                Clear
              </button>
            </div>
          </div>
          <table className="table w-4/5">
            <thead>
              <tr className="text-xs sm:text-xl">
                <th>Task</th>
                <th>Start Date</th>
                <th>Deadline</th>
                <th className='disabled'>Comment</th>
                <th>Assigned By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xl">
              {(searchedTasks.length > 0 ? searchedTasks : tasks).map((task) => (
                <TaskRow
                  key={task._id}
                  task={task}
                  users={users}
                  initialUser={selectedUsers[task._id] || ''}
                  onUserSelect={handleUserSelect}
                  onDeleteTask={deleteTask}
                />
              ))}
            </tbody>
          </table>
        </div>

        {success && (
          <div>
            <dialog id="my_modal_1" className="modal" open>
              <form method="dialog" className="modal-box bg-[#38bdf8]">
                <h3 className="font-bold text-xs sm:text-lg">Task Deleted</h3>
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
    </>
  );
};

export default MyTasks;
