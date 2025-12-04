// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = useSelector((state) => state.auth.token);

//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector(s => s.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
