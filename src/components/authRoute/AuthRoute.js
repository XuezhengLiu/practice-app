import { hasToken } from '../../utils/storage'
import { Navigate, useLocation } from 'react-router-dom'


const AuthRoute = ({ children }) => {
  const location = useLocation()

  return hasToken() ? children : <Navigate to="/login" replace state={{ from: location }}></Navigate>
}

export default AuthRoute
