import ApiService from "../../api.js";
import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import YachtCard from "../../components/YachtCard";

const AdminSingleUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    ApiService.init();
    ApiService.setHeader();
    const [user, setUser] = useState(false);

    async function fetchData() {
        setLoading(true);
        const response = await ApiService.get(`/user/${id}`);
        if (response.status === 200) {
            setUser(response.data);
        } else {
            navigate(-1);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addAdmin = async () => {
        const response = await ApiService.post(`/user/${id}/admin`);
        if (response.status === 200){
            navigate(0);
        }else navigate("/");
    }

    const banUser = async () => {
        const response = await ApiService.delete(`/user/${id}`);
        if (response.status === 204) navigate(0);
        if (response.status === 403) alert(response.error);
        else{
            navigate("/");
        }
    }

    if (loading) {
        return (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light opacity-75 z-3">
                <Spin size="large" />
            </div>
        );
    }

    if(!user) return (
        <></>
    )

    return (
        <>
            <div className="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="text-primary text-center">Profile info</h1>
                        <div className="w-50 h-75 rounded-5 border border-5 border-primary d-flex flex-column justify-content-center align-items-center position-relative">
                            <Button className="position-absolute top-0 start-0 ms-2 mt-1 px-3" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                            <div className="profile-container rounded-circle overflow-hidden border border-light" style={{ width: "300px", height: "300px" }}>
                                <img src={user.picture ?? "/Images/no-user.jpg"} alt="Profilna Slika" className="w-100 h-100 object-fit-cover" />
                            </div>
                            <form className="w-75">
                                {Object.entries(user).map(([key, value]) => {
                                    if (["email", "username", "admin"].includes(key)) {
                                        return (
                                            <div key={key} className="form-group">
                                                <label>{key}</label>
                                                <Input type="text" className="form-control" value={value ?? "Empty"} readOnly />
                                            </div>
                                        );
                                    }
                                })}
                                <div className="w-100 d-flex">
                                    {(user.admin || user.deleted_at)
                                        ? (
                                        <></>
                                    ): (
                                        <>
                                        <button type="button" className="btn btn-primary w-50 mt-3" onClick={addAdmin}>Add admin status</button>
                                        <button type="button" className="btn btn-danger w-50 mt-3 ms-1" onClick={banUser}>Ban user</button>
                                        </>
                                    )
                                    }
                                    {
                                        user.deleted_at ? (
                                            <button type="button" className="btn btn-success w-100 mt-3">Unban user</button>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </form>
                        </div>

            </div>

            <div id="sales">
                <p className="text-center h1">Your sales</p>
                <div className="d-flex flex-wrap justify-content-around align-items-center">
                    {user.sales.map((sale) => (
                        <YachtCard key={sale.yacht.id} yacht={sale.yacht} />
                    ))}
                </div>
            </div>

            <div id="rents">
                <p className="text-center h1">Your rents</p>
                <div className="d-flex flex-wrap justify-content-around align-items-center">
                    {user.rents.map((rent) => (
                        <YachtCard key={rent.yacht.id} yacht={rent.yacht} showCancel={true} rentId={rent.id}  />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminSingleUserPage;
