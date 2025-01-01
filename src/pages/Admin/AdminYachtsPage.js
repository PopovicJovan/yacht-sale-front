import Navbar from "../Navbar.js"
import YachtCard from "../../components/YachtCard";
import ApiService from "../../api";
import React, {useEffect, useState} from "react";
import {Pagination, Spin} from "antd";
import 'react-range-slider-input/dist/style.css';
import Footer from "../Footer";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import FilterDiv from "../FilterDiv";

const AdminYachtsPage = () => {
    ApiService.init();
    const [yachts, setYachts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        name: "",
        model_id: "",
        minLength: 0,
        maxLength: 0,
        minWidth: 0,
        maxWidth: 0,
        minPrice: 0,
        maxPrice: 0,
        page: 1
    });
    const navigate = useNavigate();
    useEffect(() => {
        try{
            const arrowBox = document.getElementsByClassName("ant-pagination-item-link");
            arrowBox[0].children[0].style.color = "white";
            arrowBox[1].children[0].style.color = "white";
        }catch (error){}
    }, []);


    const setFilter = (key, value) => {
        setFilters(filters => ({
            ...filters,
            [key]: value
        }));
    };



    return (
        <>
            <Navbar/>
            {loading && (
                <div className="position-fixed top-0 start-0
                w-100 h-100 d-flex justify-content-center
                 align-items-center bg-light opacity-75 z-3"
                >
                    <Spin size="large" />
                </div>
            )}
            <div className="bg-dark w-100" style={{paddingTop: "13%"}}>
                <div id="crud" className="py-3 px-3 w-50 d-flex justify-content-around align-items-center">
                    <Button variant="info" size="lg" className="px-5 py-2"
                            onClick={() => navigate("/yachts/create")}>
                        Create new yacht
                    </Button>
                    <Button variant="info" size="lg" className="px-5 py-2"
                            onClick={() => navigate("/admin/users")}>
                        See all users
                    </Button>
                </div>
                <FilterDiv setYachts={setYachts} setTotalPages={setTotalPages}
                           setLoading={setLoading} filters={filters} setFilter={setFilter}/>
                <div id="yachts" className="d-flex flex-wrap justify-content-around align-items-center">
                    {yachts.map((yacht) => (
                        <YachtCard key={yacht.id} yacht={yacht} showUpdate={true}/>
                    ))}
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center h-25">
                    <Pagination current={filters.page} total={totalPages * 6}
                                defaultPageSize={6}
                                onChange={(page) => setFilter("page", page)}
                    />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AdminYachtsPage;



