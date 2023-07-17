import About from "../About/About";
import Touch from "../GetInTouch/Touch";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";


const Homepage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <About></About>
            <Touch></Touch>
            <Footer></Footer>
        </div>
    );
};

export default Homepage;