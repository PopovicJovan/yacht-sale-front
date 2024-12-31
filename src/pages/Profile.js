import ApiService from "../api";
import React, {useEffect, useState} from "react";
import {Input, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    ApiService.init();
    ApiService.setHeader();
    const [me, setMe] = useState({});
    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            const response = await ApiService.get("/user/show");
            response.status === 200 ? setMe(response.data) : navigate(-1);
            setLoading(false)
        }
        fetchData();
    }, []);


    return (
    <div className="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
        {loading && (
            <div className="position-fixed top-0 start-0
                w-100 h-100 d-flex justify-content-center
                 align-items-center bg-light opacity-75 z-3"
            >
                <Spin size="large" />
            </div>
        )}
        <h1 className="text-primary text-center">Profile info</h1>
        <div className="w-50 h-75 rounded-5 border border-5
                        border-primary d-flex flex-column justify-content-center align-items-center position-relative">
            {me.admin && <Button className="position-absolute top-0 end-0 me-2 mt-1" href="/admin">Admin page</Button>}
            <Button className="position-absolute top-0 start-0 ms-2 mt-1 px-3" onClick={() => navigate(-1)} >Back</Button>
            <div className="profile-container rounded-circle overflow-hidden border border-light" style={{width:"300px", height:"300px"}}>
                <img src={me.picture ?? "Images/no-user.jpg"} alt="Profilna Slika"
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
