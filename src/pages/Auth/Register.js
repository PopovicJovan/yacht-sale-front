import {useState} from "react";
import ApiService from "../../api.js";
import {useNavigate} from "react-router-dom";
const Register = () => {
    ApiService.init();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        admin: false
    });
    const handleChange = (e) => {
        const errorMessage = document.getElementById("errorMessage");
        if (!errorMessage.classList?.contains("invisible")){
            errorMessage.classList.add("invisible");
        }
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await ApiService.post("/auth/register", form);
        if (response.status === 200) return navigate("/login");
        else{
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.innerText = response.error;
            errorMessage.classList.remove("invisible");
        }
    }

    return (
        <div className="vh-100 w-full d-flex justify-content-center align-items-center">
            <div className="w-25 rounded-5 border border-primary d-flex justify-content-center align-items-center" id="register-form-parent">
                <form className="w-100 h-100 d-flex  flex-column justify-content-around px-5 py-3"
                      onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input required type="text" className="form-control" name="username"
                               placeholder="Enter username" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input required type="email" className="form-control" name="email"
                               placeholder="Enter email" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input required type="password" className="form-control" name="password"
                               placeholder="Password" onChange={handleChange}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input"/>
                            <label className="form-check-label">Remember me</label>
                        </div>
                        <a href="#" className="ml-auto px-2">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div className="text-center">
                        <a href="/login" className="ml-auto px-2">Already have account?</a>
                    </div>
                    <div className="m-0">
                        <p id="errorMessage" className={"text-danger text-center invisible p-0 m-0"}>Error message</p>
                    </div>
                    <a href="/" className="text-center">continue as guest?</a>
                </form>
            </div>
        </div>
    )
}

export default Register;