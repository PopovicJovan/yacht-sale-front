import {DatePicker, Dropdown, Input, InputNumber, Space} from "antd";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import ApiService from "../api";
import {useNavigate} from "react-router-dom";

const FilterDiv = ({setYachts, setTotalPages, setLoading, filters, setFilter, admin=false}) => {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();
    ApiService.init();
    const fetchData = async () => {
        setLoading(true)
        const yachtResponse = await ApiService.get("/yacht", {...filters});
        if (yachtResponse.status === 200){
            setYachts(yachtResponse.data.yachts);
            setTotalPages(yachtResponse.data.total_pages)
        }
        else alert(yachtResponse.error);

        const modelResponse = await ApiService.get("/model");
        if (modelResponse.status === 200){
            setModels(modelResponse.data);
        }
        else alert(modelResponse.error);
        setLoading(false)
    };
    useEffect(() => {
        fetchData();
    }, [filters.page]);
    const handleMenuClick = (e) => setFilter("model_id", e.key);
    const menuProps = {
        items: models.map(item => ({label: item.name, key: item.id})),
        onClick: handleMenuClick,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(name, value)
    }

    const sorts = [
        {label: 'price asc', key: 'price_asc'},
        {label: 'price desc', key: 'price_desc'},
        {label: 'available for rent', key: 'available_for_rent'},
        {label: 'available for sale', key: 'available_for_sale'}
    ];
    const handleSortClick = (e) => setFilter("sort_by", e.key);
    const sortProps = {
        items: sorts.map(item => ({label: item.label, key: item.key})),
        onClick: handleSortClick,
    };

    const { RangePicker } = DatePicker;
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
                <Space size={12}>
                    {admin && (
                        <Button variant="info" size="lg" className="px-5 py-2"
                                onClick={() => navigate("/yachts/create")}>
                            Create new yacht
                        </Button>
                    )}
                    <div className="d-flex flex-column justify-content-center mb-4">
                        <p className="text-white text-center p-0 m-0">Choose rent date</p>
                        <RangePicker size="large"
                                     onChange={(_, info) => {
                                         setFilter("startDate", info[0]);
                                         setFilter("endDate", info[1]);
                                     }}/>
                    </div>
                    <Dropdown.Button menu={sortProps} size="large" onClick={handleSortClick}
                                     name="sort_by">
                        Sort by
                    </Dropdown.Button>
                    {admin && (
                        <Button variant="info" size="lg" className="px-5 py-2"
                                onClick={() => navigate("/admin/users")}>
                            See all users
                        </Button>
                    )}
                </Space>
            </div>
            <div id="filters" className="filter-div px-5">
                <div className="d-flex justify-content-around align-items-center h-100 w-50 p-0 m-0">
                    <div className="form-group h-75 w-50 d-flex justify-content-center align-items-center">
                        <Input
                            placeholder="Search by name"
                            size="large"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <Space wrap className="h-50 w-25 d-flex justify-content-center align-items-center">
                        <Dropdown.Button menu={menuProps} size="large" onClick={handleMenuClick}
                                         name="model_id">
                            Filter by models
                        </Dropdown.Button>
                    </Space>
                </div>
                <div className="h-75 w-50 d-flex justify-content-around align-items-center mb-2"
                     id="min-max-box">
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
    )
}


export default FilterDiv;