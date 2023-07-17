import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccess(true);
        form.reset();
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
      <div className="w-full p-10">
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
        {/* form */}
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-xl font-extrabold text-gray-700 mb-5">
            Add User
          </p>
          <form onSubmit={handleSignUp}>
            <div>
              <p>Enter Name</p>
              <br />
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered input-primary w-full"
              />
              <br />
            </div>

            <div>
              <p>Enter Email</p>
              <br />
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered input-primary w-full"
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
                className="input input-bordered input-primary w-full"
              />
            </div>

            <button className="btn btn-primary mt-4" type="submit">
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
