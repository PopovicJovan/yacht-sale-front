import Navbar from "./Navbar.js"
import YachtCard from "../components/YachtCard";
import ApiService from "../api";
import React, {useEffect, useState} from "react";
import {Pagination, Spin} from "antd";
import 'react-range-slider-input/dist/style.css';
import Footer from "./Footer";
import FilterDiv from "./FilterDiv";

const Yachts = () => {
    ApiService.init();
    const [yachts, setYachts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        name: "",
        model_id: "",
        minLength: 0,
        maxLength: null,
        minWidth: 0,
        maxWidth: null,
        minPrice: 0,
        maxPrice: null,
        page: 1
    });

    useEffect(() => {
        try{
            const arrowBox = document.getElementsByClassName("ant-pagination-item-link");
            arrowBox[0].children[0].style.color = "white";
            arrowBox[1].children[0].style.color = "white";
        }catch (error){}
    },[filters.page]);

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
                <FilterDiv setYachts={setYachts} setTotalPages={setTotalPages} setLoading={setLoading}/>
            <div id="yachts" className="d-flex flex-wrap justify-content-around align-items-center">
                {yachts.map((yacht) => (
                    <YachtCard yacht={yacht}/>
                ))}
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center h-25">
                <Pagination current={filters.page} total={totalPages*6}
                            defaultPageSize={6}
                            onChange={(page) => setFilter("page", page)}
                            />
            </div>
        </div>
            <Footer/>
        </>
    )
}

export default Yachts;



