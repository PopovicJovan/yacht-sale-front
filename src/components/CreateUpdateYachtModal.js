import {DatePicker, Dropdown, Input, InputNumber,Space} from "antd";
import React, {useEffect, useState} from "react";
import TextArea from "antd/lib/input/TextArea";
import dayjs from 'dayjs';
import ApiService from "../api";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const CreateUpdateYachtModal = ({yacht, onExit, models=[]}) => {
    ApiService.init();
    ApiService.setHeader();
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState([]);
    const [warning_text, setWarningText] = useState("");
    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {setFile(e.target.files[0])};

    const yachtListData = {
        name: yacht?.name ?? "",
        model_id: yacht?.model?.id ?? "",
        rent_price: yacht?.rent_price ?? 0,
        sale_price: yacht?.sale_price ?? 0,
        status_id: yacht?.status?.id ?? "",
        description: yacht?.description ?? "",
        year: yacht?.year
    }
    const [yachtData, setYachtData] = useState(yachtListData);

    const error = document.getElementById("error-box")
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', file);
        let cnt = true;
        for(let key in yachtData){
            if(["", 0].includes(yachtData[key])){
                if(key === "model_id") key = "model";
                if(key === "status_id") key = "status";
                if(key === "rent_price") key = "rent price";
                if(key === "sale_price") key = "sale price";
                setWarningText(`Please enter ${key} !`);
                cnt = false;
                error.classList?.remove("invisible");
                break;
            }
        }
        if(cnt){
            let response;
            let id;
            if(!yacht){
                response = await ApiService.post("/yacht", {...yachtData});
                id = response.data.id
            } else{
                id = yacht.id
                response = await ApiService.put(`/yacht/${id}`, {...yachtData});
            }
            if (response.status === 200 || response.status === 201 ){
                 await ApiService.post(`/yacht/${id}/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                setYachtData(yachtListData);
                onExit();
                navigate(0);
            }
            if(response.status === 403 || response.status === 401){
                navigate("/");
            }

        }
    }

    const setData = (key, value) => {
        setYachtData(yachtData => ({
            ...yachtData,
            [key]: value
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }
    const getStatuses = async () => {
        const response = await ApiService.get("/status");
        if (response.status === 200) setStatuses(response.data)
    }
    useEffect(() => {getStatuses();}, []);

    const handleModelClick = (e) => setData("model_id", e.key);
    const modelsMenu = {
        items: models?.map(item => ({label: item.name, key: item.id})),
        onClick: handleModelClick,
    };
    const handleStatusClick = (e) => setData("status_id", e.key);
    const statusesMenu = {
        items: statuses?.map(item => ({label: item.name, key: item.id})),
        onClick: handleStatusClick,
    };
    
    return (
    <div id="top-div" className="w-100 vh-100 d-flex justify-content-center align-items-center position-fixed" style={{zIndex: "1001", backdropFilter: 'blur(10px)'}}>
        <div id="form" className="w-50 h-75 border border-2 border-primary rounded rounded-5 p-3 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmitForm}>
                <Button className="position-absolute top-0 end-0 me-2 mt-1" onClick={onExit}>Close page</Button>
                <div className="form-group">
                    <label className="text-white">Name:</label>
                    <Input type="text" className="form-control" value={yachtData?.name} onChange={handleInputChange}
                           name="name"/>
                </div>
                <Space direction="horizontal" className="d-flex align-items-center justify-content-around">
                    <div className="d-flex flex-column">
                        <label className="text-white">Rent price:</label>
                        <InputNumber addonBefore="+" addonAfter="€" defaultValue={yachtData?.rent_price ?? 0}
                                     color="white" step={10000} name="rent_price"
                                     onChange={(value) => setData("rent_price", value)}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="text-white">Sale price:</label>
                        <InputNumber addonBefore="+" addonAfter="€" defaultValue={yachtData?.sale_price ?? 0}
                                     color="white" step={100} name="sale_price"
                                     onChange={(value) => setData("sale_price", value)}/>
                    </div>
                </Space>
                <div className="form-group">
                    <label className="text-white">Description</label>
                    <TextArea type="text" className="form-control" value={yacht?.description}
                              onChange={handleInputChange} name="description"/>
                </div>
                <Space direction="horizontal" className="w-100 d-flex justify-content-around mt-2">
                    <DatePicker value={yachtData?.year ? dayjs(yachtData.year) : dayjs()} size="large"
                                onChange={(date, dateString) => {
                                    setData("year", dateString)
                                }}
                                disabledDate={disabledDate} name="year"/>
                    <Dropdown.Button menu={modelsMenu} size="large" onClick={handleModelClick} name="model_id"
                                     className="ant-dropdown-menu">
                        Select model
                    </Dropdown.Button>
                    <Dropdown.Button menu={statusesMenu} size="large" onClick={handleStatusClick} name="status_id"
                                     className="ant-dropdown-menu">
                        Select status
                    </Dropdown.Button>
                    <div>
                        <label htmlFor="file-upload" className="btn btn-primary">
                            Choose File
                        </label>
                        <input id="file-upload" type="file" className="d-none" accept="image/jpeg" onChange={handleFileChange} />
                    </div>
                </Space>
                {
                    yacht && (<Button size="lg" className="w-100 mt-3" type={"submit"}>UPDATE</Button>)
                }
                {
                    !yacht && (<Button size="lg" className="w-100 mt-3" type={"submit"}>CREATE</Button>)
                }
                <h5 className="text-danger fw-bold invisible text-center mt-2" id="error-box">
                    {warning_text ?? "warning text example"}
                </h5>
            </form>
        </div>
    </div>
    )
}

export default CreateUpdateYachtModal;