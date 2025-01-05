import { Navigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    const navigate = (<Navigate to={"/"} replace />);

    if (!token) return navigate;
    try {
        jwtDecode(token);
    } catch (error) {
        return navigate;
    }
};

export default PrivateRoute;