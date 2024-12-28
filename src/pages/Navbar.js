import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        navigate(0);
    }
    return (
        <nav>
            <div id="logo" className="align-content-center">
                <h1 className="text-white">Nautica</h1>
            </div>
            <div id="link-list" className="d-flex justify-content-around align-items-center w-50">
                <a href="/public" className="text-decoration-none h3 text-white">Home</a>
                <a href="/about" className="text-decoration-none h3 text-white">About</a>
                <a href="/contact" className="text-decoration-none h3 text-white">Contact</a>
            </div>
            <div id="auth-buttons" className="d-flex align-items-center justify-content-center w-25">
                {localStorage.getItem("auth_token") ?
                    <>
                    <Button variant="primary" className="h-50 w-50 px-2 py-2 mx-1" href="/me">Profile</Button>
                    <Button variant="primary" className="h-50 w-50 px-2 py-2 mx-1" onClick={handleLogout}>Logout</Button>
                    </>
                    :
                    <>
                        <Button href="/login" variant="primary" className="h-50 w-50 px-2 py-2 mx-1">Login</Button>
                        <Button href="/register" variant="primary" className="h-50 w-50 px-2 py-2 mx-1">Register</Button>
                    </>
                }
            </div>
        </nav>
    )
};

export default Navbar;