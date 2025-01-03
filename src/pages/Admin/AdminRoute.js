import { Navigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    const navigate = (<Navigate to={"/"} replace />);

    if (!token) return navigate;
    try {
        const decodedToken = jwtDecode(token);
        const admin = decodedToken.admin;
        return admin ? children : navigate;
    } catch (error) {
        return navigate;
    }
};

export default AdminRoute;