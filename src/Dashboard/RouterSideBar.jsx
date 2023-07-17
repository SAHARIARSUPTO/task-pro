import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faAdd, faCalendarMinus, faMessage, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State for showing/hiding the dropdown menu
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State for checking if it's a small screen

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to close the dropdown menu and handle button click
  const closeDropdown = () => {
    setShowDropdown(false);
  };

  // Function to check screen size on mount and resize
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className=' sm:min-h-screen sm:bg-[#38bdf8]'>
      <div>
        <div className='p-5'>
          {isSmallScreen ? ( // Show dropdown on small screens
            <details className='dropdown mb-32' open={showDropdown}>
              <summary className='m-1 btn btn-warning' onClick={toggleDropdown}>
                Open or Close
              </summary>
              <ul
                className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'
                onClick={closeDropdown}
              >
                <li>
                  <Link to='mytasks'>
                    <FontAwesomeIcon className='me-1' icon={faDashboard} />
                    All Tasks
                  </Link>
                </li>
                <li>
                  <Link to='completed'>
                    <FontAwesomeIcon className='me-1' icon={faTasks} />
                    Completed Task
                  </Link>
                </li>
                <li>
                  <Link to='due'>
                    <FontAwesomeIcon className='me-1' icon={faFireAlt} />
                    Due Tasks
                  </Link>
                </li>
                <p className='text-black font-bold text-center mb-2'>Admin Role</p>
                <hr className='mx-auto border-black border-2 w-4/5 mb-4' />
                <div className='mb-4'>
                  <Link to='alluser'>
                    <FontAwesomeIcon className='me-1' icon={faUser} />
                    Users
                  </Link>
                </div>
                <div className='mb-4'>
                  <Link to='adduser'>
                    <FontAwesomeIcon className='me-1' icon={faAdd} />
                    Add Users
                  </Link>
                </div>
                <div className='mb-4'>
                  <Link to='addtask'>
                    <FontAwesomeIcon className='me-1' icon={faAdd} />
                    Add Tasks
                  </Link>
                </div>
                <div className='mb-4'>
                  <Link to='message'>
                    <FontAwesomeIcon className='me-1' icon={faMessage} />
                    Messages
                  </Link>
                </div>
              </ul>
            </details>
          ) : (
            // Show default behavior on large screens
            <>
              <div className='mb-4'>
                <Link to='mytasks'>
                  <FontAwesomeIcon className='me-1' icon={faDashboard} />
                  All Tasks
                </Link>
              </div>
              <div className='mb-4'>
                <Link to='completed'>
                  <FontAwesomeIcon className='me-1' icon={faTasks} />
                  Completed Task
                </Link>
              </div>
              <div className='mb-7'>
                <Link to='due'>
                  <FontAwesomeIcon className='me-1' icon={faFireAlt} />
                  Due Tasks
                </Link>
              </div>
              <p className='text-black text-center font-bold mb-2'>Admin Role</p>
              <hr className='mx-auto border-black border-2 w-4/5 mb-4' />
              <div className='mb-4'>
                <Link to='alluser'>
                  <FontAwesomeIcon className='me-1' icon={faUser} />
                  Users
                </Link>
              </div>
              <div className='mb-4'>
                <Link to='adduser'>
                  <FontAwesomeIcon className='me-1' icon={faAdd} />
                  Add Users
                </Link>
              </div>
              <div className='mb-4'>
                <Link to='addtask'>
                  <FontAwesomeIcon className='me-1' icon={faAdd} />
                  Add Tasks
                </Link>
              </div>
              <div className='mb-4'>
                <Link to='message'>
                  <FontAwesomeIcon className='me-1' icon={faMessage} />
                  Messages
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
