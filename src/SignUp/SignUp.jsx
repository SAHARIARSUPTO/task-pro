import { Link, useNavigate } from "react-router-dom";
import login from "./login.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProviders/AuthProvider";

const SignUp = () => {
  const { setUser, createUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const form = event.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      const loggedUser = result.user;
      setUser(loggedUser);
      setSuccess(true);
      await createUserOnServer(displayName, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  const createUserOnServer = async (displayName, email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName,
        email,
        password,
      }),
    };

    try {
      const response = await fetch("http://localhost:3000/users", requestOptions);
      const result = await response.json();
      setUser(result.user);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="w-full items-center justify-center mx-auto min-h-screen">
      <div className="w-4/5 p-10 items-center justify-center mx-auto">
        <div className="flex justify-between items-center mx-auto">
          <div>
            <Link to="/">
              <p className="text-xl sm:text-2xl font-bold">
                <span className="text-primary">Task</span>Pro
              </p>
            </Link>
          </div>
          <div>
            <p className="text-xs sm:text-2xl font-bold">
              Already have an account?{" "}
              <span className="underline text-primary">
                <Link className="text-xl" to="/login">Sign In</Link>
              </span>
            </p>
          </div>
        </div>
        {success && (
          <div className="alert alert-success">
            <span>User Created successfully.</span>
          </div>
        )}
        {error && (
          <div className="alert bg-red-500 text-black">
            <span>Error Creating User.</span>
          </div>
        )}
        {/* image+form */}
        <div className="grid grid-cols-1 justify-center items-center gap-2 sm:grid-cols-2">
          <div>
            <img src={login} alt="" />
          </div>

          <div>
            <p className="text-xl sm:text-2xl font-bold">Welcome to Task Pro</p>
            <br />
            <p className="text-xl sm:text-2xl font-extrabold text-[#9ca3af] mb-5">
              Sign Up to Get Started
            </p>
            <br />

            <form onSubmit={handleSignUp}>
              <div>
                <p>Enter Your Name</p>
                <br />
                <input
                  type="text"
                  placeholder="name"
                  name="displayName"
                  className="bg-slate-100 hover:bg-slate-200 input input-bordered border-2 input-primary w-full max-w-xl mb-5"
                />
                <br />
              </div>

              <div>
                <p>Enter Your Email</p>
                <br />
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="bg-slate-100 border-2 hover:bg-slate-200 input input-bordered input-primary w-full max-w-xl mb-5"
                />
                <br />
              </div>

              <div>
                <p>Enter Your Password</p>
                <br />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="bg-slate-100 border-2 hover:bg-slate-200 input input-bordered input-primary w-full max-w-xl"
                />
              </div>

              <button className="btn btn-primary mt-4" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
