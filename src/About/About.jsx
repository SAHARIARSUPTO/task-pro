import { Link, useLocation } from 'react-router-dom';
import aboutImage from './about.png';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';

const About = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <>
      {!isRootPath && <Navbar />}
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mt-8 text-center">About AuthPro</h1>
        <div className="grid grid-cols-1 justify-center text-center items-center mx-auto ps-10 pe-10 sm:grid-cols-2">
          <div>
            <img src={aboutImage} alt="" />
          </div>
          <div>
            <p className="text-2xl my-4">
              AuthPro is a comprehensive authentication and authorization system built to secure web applications. It provides robust user management, authentication features, and fine-grained access control, ensuring the protection of sensitive data and resources.
              With AuthPro, developers can easily integrate authentication into their applications, handle user registration and login, implement password reset functionality, and manage user roles and permissions. It offers a seamless and secure user experience, allowing businesses to focus on their core functionalities while ensuring data privacy and security.
              <span className='font-bold'> Contact us <Link to='mailto:supto.cse.vu@gmail.com'>Via Mail</Link></span>
            </p>
          </div>
        </div>
      </div>
      {!isRootPath && <Footer />}
    </>
  );
};

export default About;
