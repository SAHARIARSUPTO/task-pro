import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from '../AuthProviders/AuthProvider';
import { Navigate, useLocation } from "react-router-dom";

const Private = ({ children }) => {
  const { user } = useContext(AuthContext);
    const location = useLocation();
    console.log(location)


console.log(user)
  if (user) {
    return children;
  }

  return <Navigate state={{from:location}} to="/login" />;
};

Private.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Private;
