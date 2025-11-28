import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children }) => {
    const jwtToken = Cookies.get('recruiterToken')
    const decodedValue = jwtDecode(jwtToken)
    if (jwtToken === undefined || decodedValue.role !== 'recruiter') {
        return <Navigate to={`${import.meta.env.VITE_REACT_APP_FRONTEND_URL}/login`} replace />
    }
    return children
}
export default ProtectedRoute