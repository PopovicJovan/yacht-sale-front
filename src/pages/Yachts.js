import Navbar from "./Navbar.js"
import YachtCard from "../components/YachtCard";
import ApiService from "../api";
import React, {useEffect, useState} from "react";
import {Dropdown, Input, InputNumber, Button, Pagination, Space, Spin} from "antd";
import 'react-range-slider-input/dist/style.css';
import Footer from "./Footer";
import {useNavigate} from "react-router-dom";

const Yachts = () => {
    ApiService.init();
    const navigate = useNavigate();
    const [yachts, setYachts] = useState([]);
    const [models, setModels] = useState([]);
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
    const fetchData = async () => {
        setLoading(true);
        const yachtResponse = await ApiService.get("/yacht", {...filters});
        if (yachtResponse.status === 200){
            setYachts(yachtResponse.data.yachts);
            setTotalPages(yachtResponse.data.total_pages);
        }
        else alert(yachtResponse.error);

        const modelResponse = await ApiService.get("/model");
        if (modelResponse.status === 200){
            setModels(modelResponse.data);
        }
        else alert(modelResponse.error);
        setLoading(false);
    };
    useEffect(() => {
        try{
            const arrowBox = document.getElementsByClassName("ant-pagination-item-link");
            arrowBox[0].children[0].style.color = "white";
            arrowBox[1].children[0].style.color = "white";
        }catch (error){}
        fetchData();
    },[filters.page]);

    const setFilter = (key, value) => {
        setFilters(filters => ({
            ...filters,
            [key]: value
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(name, value)
    }

    const handleMenuClick = (e) => setFilter("model_id", e.key);
    const menuProps = {
        items: models.map(item => ({label: item.name, key: item.id})),
        onClick: handleMenuClick,
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
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div id="filters" className="filter-div px-5" style={{height: "15vh"}}>
                        <div className="d-flex justify-content-around align-items-center h-100 w-50 p-0 m-0">
                            <div className="form-group h-75 w-50 d-flex justify-content-center align-items-center">
                                <Input
                                    placeholder="Search by name"
                                    className="h-50"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <Space wrap className="h-50 w-25 d-flex justify-content-center align-items-center">
                            <Dropdown.Button menu={menuProps} size="large" onClick={handleMenuClick} name="model_id">
                                Filter by models
                            </Dropdown.Button>
                            </Space>
                        </div>
                        <div className="h-75 w-50 d-flex justify-content-around align-items-center mb-2" id="min-max-box">
                            <div id="price" className="d-flex flex-column justify-content-center">
                                <h6 className="text-white text-center m-1 p-0">Choose price range</h6>
                                <div className="w-100 h-75 d-flex justify-content-between align-items-center">
                                    <InputNumber min={0} max={10000000} defaultValue={0}
                                                 onChange={(value) => setFilter("minPrice", value)}/>
                                    <h6 className="text-white text-center mx-2">TO</h6>
                                    <InputNumber min={0} max={10000000} defaultValue={10000000}
                                                 onChange={(value) => setFilter("maxPrice", value)}/>
                                </div>
                            </div>
                            <div id="length" className="d-flex flex-column justify-content-between">
                                <h6 className="text-white text-center m-1 p-0">Choose length range</h6>
                                <div className="w-100 h-75 d-flex justify-content-between align-items-center">
                                    <InputNumber min={0} max={200} defaultValue={0}
                                                 onChange={(value) => setFilter("minLength", value)}/>
                                    <h6 className="text-white text-center mx-2">TO</h6>
                                    <InputNumber min={0} max={200} defaultValue={200}
                                                 onChange={(value) => setFilter("maxLength", value)}/>
                                </div>
                            </div>
                            <div id="width" className="d-flex flex-column justify-content-between">
                                <h6 className="text-white text-center m-1 p-0">Choose width range</h6>
                                <div className="w-100 h-75 d-flex justify-content-between align-items-center">
                                    <InputNumber min={0} max={50} defaultValue={0}
                                                 onChange={(value) => setFilter("minWidth", value)}/>
                                    <h6 className="text-white text-center mx-2">TO</h6>
                                    <InputNumber min={0} max={50} defaultValue={50}
                                                 onChange={(value) => setFilter("maxWidth", value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className="w-50" type="primary" size="large" onClick={() => fetchData()}>
                        Apply filters
                    </Button>
                    <Button className="w-50 bg-success mt-1" size="large" onClick={() => navigate(0)}>
                        Reset filters
                    </Button>
                </div>
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



