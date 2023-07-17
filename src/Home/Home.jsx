const Home = () => {
    return (
      <div>
        <div
          className="hero min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url(https://newmibridges.michigan.gov/resource/1679148661000/ISD_Icons/landing-page/group-3.svg)"
          }}
        >
          <div className="hero-content text-center">
            <div className=" p-10 rounded-xl backdrop-blur-2xl bg-[#7dd3fc]">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="text-2xl py-6">With Auth Master, users gain access to a comprehensive set of features that facilitate task creation, updates, and deletions, ensuring a seamless and organized workflow. The system intuitive interface and user-friendly design prioritize user experience, enabling users to navigate effortlessly through the application.</p>
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  