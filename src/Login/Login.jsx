import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "./login.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProviders/AuthProvider";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error,setError]=useState(false);
  const navigate = useNavigate();
  const { signInUser, setUser,user } = useContext(AuthContext);

const location = useLocation()
const from = location.state?.from?.pathname || '/'

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccess(true);
        form.reset();
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        navigate(from,{replace:true});
      })
      .catch((error) => {
        setError(true);
        form.reset()
      });
  };
console.log(user);
  return (
    <div className="w-full  items-center justify-center mx-auto min-h-screen">
      <div className="w-4/5  p-10  items-center  justify-center mx-auto">
        <div className="flex justify-between items-center  mx-auto">
          <div>
            <Link to="/">
              <p className="text-xl font-bold sm:text-2xl">
                <span className="text-primary">Task</span>Pro
              </p>
            </Link>
          </div>
          <div>
            <p className="text-xl font-bold sm:text-2xl">
              New User?{" "}
              <span className="underline text-primary">
                <a href="/signup">Sign Up</a>
              </span>
            </p>
          </div>
        </div>

        {success && (
          <div>
            <div className="alert alert-success mt-5 w-3/5">
              <span className="text-xl font-bold sm:text-xl">SignIn successfully.</span>
            </div>
          </div>
        )}
        {error && (
          <div>
            <div className="alert bg-red-200 text-black mt-5 w-3/5">
              <span className="text-xl font-bold sm:text-xl">SignIn Error</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1  justify-center items-center gap-2 sm:grid-cols-2">
          <div>
            <img src={login} alt="" />
          </div>

          <div>
            <p className="text-xl font-bold sm:text-xl">Welcome to Task Pro</p>
            <br />
            <p className="text-xl font-extrabold text-[#9ca3af] mb-5 sm:text-xl">
              Login to Continue
            </p>{" "}
            <br />

            <form onSubmit={handleSignIn}>
              <div>
                <p>Enter Your Email</p>
                <br />
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="bg-slate-100 border-2 hover:bg-slate-200 input input-bordered input-primary w-full max-w-xl mb-5"
                />{" "}
                <br />
              </div>

              <div>
                <p>Enter Your Password</p>
                <br />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className=" bg-slate-100 border-2 hover:bg-slate-200 input input-bordered input-primary w-full max-w-xl"
                />
              </div>

              <button className="btn btn-primary mt-4" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
