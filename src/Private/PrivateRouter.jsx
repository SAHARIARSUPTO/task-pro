import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from '../AuthProviders/AuthProvider';
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
    const location = useLocation();
    console.log(location)


console.log(user)
  if (user) {
    return children;
  }

  return <Navigate state={{from:location}} to="/login" />;
};

PrivateRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRouter;
