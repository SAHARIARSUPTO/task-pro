import React, { useState, useEffect } from 'react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://task-pro-server.vercel.app/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://task-pro-server.vercel.app/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccess(true);
        fetchUsers();
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  if (loading) {
    return <span className="loading loading-spinner justify-center text-center items-center loading-lg"></span>;
  }

  return (
    <div>
      <h2 className="text-center text-4xl mx-auto ms-5 font-extrabold  lg:text-4xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-sm lg:text-xl">Name</th>
              <th className="text-sm lg:text-xl">Email</th>
              <th className="text-sm lg:text-xl">Password</th>
              <th className="text-sm lg:text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-sm lg:text-xl">{user.displayName}</td>
                <td className="text-sm lg:text-xl">{user.email}</td>
                <td className="text-sm lg:text-xl">{user.password}</td>
                <td className="text-sm lg:text-xl">
                  <button className='btn btn-warning' onClick={() => deleteUser(user._id)}>
                    Remove User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {success && (
        <div>
          <dialog id="my_modal_1" className="modal" open>
            <form method="dialog" className="modal-box bg-[#38bdf8]">
              <h3 className="font-bold text-lg">User Deleted</h3>
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

export default AllUsers;
