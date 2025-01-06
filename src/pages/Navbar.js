import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {useState} from "react";
const Navbar = ({myClass}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        navigate(0);
    }
    const [menuStatus, setMenuStatus] = useState(false)
    return (
        <>
            <nav className={`${myClass} nav-lg d-none d-md-flex`}>
                <div id="logo" className="align-content-center d-none d-lg-block">
                    <h1 className="text-white">Nautica</h1>
                </div>
                <div id="link-list" className="d-flex justify-content-around align-items-center w-50">
                    <a href="/" className="text-decoration-none h3 text-white">Home</a>
                    <a href="/#" className="text-decoration-none h3 text-white">About</a>
                    <a href="/contact" className="text-decoration-none h3 text-white">Contact</a>
                </div>
                <div id="auth-buttons" className="d-flex align-items-center justify-content-center w-25">
                    {localStorage.getItem("auth_token") ?
                        <>
                        <Button variant="primary" className="h-50 w-50 px-2 py-2 mx-1" onClick={() => navigate("/me")}>Profile</Button>
                        <Button variant="primary" className="h-50 w-50 px-2 py-2 mx-1" onClick={handleLogout}>Logout</Button>
                        </>
                        :
                        <>
                            <Button onClick={() => navigate("/login")} variant="primary" className="h-50 w-50 px-2 py-2 mx-1">Login</Button>
                            <Button onClick={() => navigate("/register")} variant="primary" className="h-50 w-50 px-2 py-2 mx-1">Register</Button>
                        </>
                    }
                </div>
            </nav>
            <nav className="nav-sm d-md-none">
                <div id="auth-buttons" className="w-75 d-flex align-items-center ps-2">
                    {localStorage.getItem("auth_token") ?
                        <>
                            <Button variant="primary" className="h-50 w-50 px-2 py-2 mx-1"
                                    onClick={() => navigate("/me")}>Profile</Button>
                            <Button variant="primary" className="h-50 w-50 px-2 py-2 mx-1"
                                    onClick={handleLogout}>Logout</Button>
                        </>
                        :
                        <>
                            <Button onClick={() => navigate("/login")} variant="primary"
                                    className="h-50 w-50 px-2 py-2 mx-1">Login</Button>
                            <Button onClick={() => navigate("/register")} variant="primary"
                                    className="h-50 w-50 px-2 py-2 mx-1">Register</Button>
                        </>
                    }
                </div>
                <div className="w-25">
                    <GiHamburgerMenu size="lg" onClick={() => setMenuStatus(!menuStatus)}/>
                    {menuStatus && (
                        <li className="nav-list border border-2">
                            <dl className="text-center text-white p-0 m-0 py-2 border border-1">
                                <a href="/" className="text-decoration-none text-white">HOME</a>
                            </dl>
                            <dl className="text-center text-white p-0 m-0 py-2 border border-1">
                                <a href="/#" className="text-decoration-none text-white">ABOUT</a>
                            </dl>
                            <dl className="text-center text-white p-0 m-0 py-2 border border-1">
                                <a href="/contact" className="text-decoration-none text-white">CONTACT</a>
                            </dl>
                        </li>
                    )}
                </div>
            </nav>
        </>)
};

export default Navbar;