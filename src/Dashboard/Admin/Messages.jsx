import React, { useState, useEffect } from 'react';

const MessageRow = ({ message, onDelete }) => {
  const handleDelete = () => {
    onDelete(message._id);
  };

  return (
    <tr key={message._id}>
      <td>{message.name}</td>
      <td>{message.email}</td>
      <td>{message.message}</td>
      <td>{message.createdAt}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletedMessageId, setDeletedMessageId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://taskpro-server-sahariarsupto.vercel.app/messages');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`https://taskpro-server-sahariarsupto.vercel.app/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setShowModal(true);
        setDeletedMessageId(messageId);
        removeDeletedMessage(messageId);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const removeDeletedMessage = (messageId) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
  };

  const closeModal = () => {
    setShowModal(false);
    setDeletedMessageId(null);
  };

  if (loading) {
    return <span className="loading loading-spinner justify-center text-center items-center loading-lg"></span>;
  }

  return (
    <>
      <h2 className="text-center text-2xl mx-auto ms-5 font-extrabold  lg:text-4xl">Messages</h2>
      <div className="flex h-screen">
        <div className="overflow-x-auto text-xl">
          <table className="table">
            <thead>
              <tr className="text-sm sm:text-xl ">
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xl">
              {messages.map((message) => (
                <MessageRow key={message._id} message={message} onDelete={deleteMessage} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div>
          <dialog id="my_modal_1" className="modal" open>
            <form method="dialog" className="modal-box bg-[#38bdf8]">
              <h3 className="font-bold text-lg">Task Deleted</h3>
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
    </>
  );
};

export default Messages;
