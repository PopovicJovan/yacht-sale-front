import Navbar from "../Navbar";
import {useEffect, useState} from "react";
import ApiService from "../../api";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

const AdminUsersPage = () => {
    const [users, setUsers] = useState()
    const navigate = useNavigate();
    ApiService.init();
    ApiService.setHeader();

    const fetchUsers = async () => {
        const response = await ApiService.get("/user/all-users");
        if(response.status === 200){
            setUsers(response.data);
        }else{
            navigate("/")
        };
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Navbar myClass="bg-dark"/>
            <div className="bg-dark w-100 vh-100 d-flex flex-column justify-content-center align-items-center overflow-y-scroll"
                 style={{paddingTop: "45%"}}>
                <table className="table table-hover h-50 w-75">
                    <thead>
                        <tr>
                            {users && Object.keys(users[0]).map((k) => {
                                if(k !== "picture" &&  k !== "deleted_at") return (
                                <th scope="col" key={k}>
                                    {k}
                                </th>
                                )
                            })}
                            <th scope="col" key="options">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user) => (
                            <tr className={user.deleted_at ? "table-danger" : ""}>
                                {Object.entries(user).map(([key, value], index) => {
                                    if(key !== "picture" && key !== "deleted_at"){
                                        value = key === "admin" ? (value ? "True" : "False") : value;
                                        return (
                                            <td key={index}>{value}</td>
                                        )
                                    }
                                })}
                                <td key="button">
                                    <Button href={`/admin/users/${user.id}`}>See details</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminUsersPage;