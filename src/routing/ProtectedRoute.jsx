import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.js';
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuth(state => state.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
