import ApiService from "../api";
import {useEffect, useState} from "react";
import { Input } from "antd";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    ApiService.init();
    ApiService.setHeader();
    const [me, setMe] = useState({});
    useEffect(() => {
        async function fetchData(){
            const response = await ApiService.get("/user/show");
            console.log(response.status);
            response.status === 200 ? setMe(response.data) : navigate(-1);
        }
        fetchData();
    }, []);


    return (
    <div className="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-primary text-center">Profile info</h1>
        <div className="w-50 h-75 rounded-5 border border-5
                        border-primary d-flex flex-column justify-content-center align-items-center">
            <div className="profile-container rounded-circle overflow-hidden border border-light" style={{width:"300px", height:"300px"}}>
                <img src={me.picture} alt="Profilna Slika"
                     className="w-100 h-100 object-fit-cover"/>
            </div>
            <form className="w-75">
                {Object.entries(me).map(([key, value]) => {
                    if (["email", "username", "admin"].includes(key)) {
                        return (
                            <>
                                <div className="form-group">
                                    <label>{key}</label>
                                    <Input type="text" className="form-control" value={value ?? "Empty"}/>
                                </div>
                            </>
                        )
                    }
                })}


                <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default Profile;
