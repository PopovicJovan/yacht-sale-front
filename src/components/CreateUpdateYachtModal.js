import {DatePicker, Dropdown, Input, InputNumber,Space} from "antd";
import React, {useEffect, useState} from "react";
import TextArea from "antd/lib/input/TextArea";
import dayjs from 'dayjs';
import ApiService from "../api";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";

const CreateUpdateYachtModal = () => {
    const {id} = useParams();
    const [yacht, setYacht] = useState();
    const [models, setModels] = useState();
    ApiService.init();
    ApiService.setHeader();
    useEffect(() => {
        getStatuses();
        getModels();
        getYacht();
    }, []);
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState([]);
    const [warning_text, setWarningText] = useState("");
    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {setFile(e.target.files[0])};

    const [yachtData, setYachtData] = useState({
        name: "",
        model_id: "",
        rent_price: 0,
        sale_price: 0,
        status_id: "",
        description: "",
        year: "",
    });
    useEffect(() => {
        if (yacht) {
            setYachtData({
                name: yacht.name ?? "",
                model_id: yacht.model?.id ?? "",
                rent_price: yacht.rent_price ?? 0,
                sale_price: yacht.sale_price ?? 0,
                status_id: yacht.status?.id ?? "",
                description: yacht.description ?? "",
                year: yacht.year ?? "",
            });
        }
    }, [yacht]);

    const error = document.getElementById("error-box")
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', file);
        for(let key in yachtData){
            if(["", 0].includes(yachtData[key])){
                setWarningText(`Please enter ${key} !`);
                error.classList?.remove("invisible");
                return;
            }
        }

        let response = yacht ?
            await ApiService.put(`/yacht/${yacht.id}`, {...yachtData}) :
            await ApiService.post("/yacht", {...yachtData});
        if ([200, 201].includes(response.status)){
             await ApiService.post(`/yacht/${response.data.id}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate(-1);
        }
        if([401, 403].includes(response.status)) navigate("/");
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
    const getModels = async () => {
        const response = await ApiService.get("/model");
        if (response.status === 200) setModels(response.data)
    }
    const getYacht = async () => {
        const response = await ApiService.get(`/yacht/${id}`);
        if(response.status === 200){
            setYacht(response.data);
        }
    }

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
                <Button className="position-absolute top-0 end-0 me-2 mt-1" onClick={() => navigate(-1)}>Close page</Button>
                <div className="form-group">
                    <label>Name:</label>
                    <Input type="text" className="form-control" value={yachtData?.name} onChange={handleInputChange}
                           name="name"/>
                </div>
                <Space direction="horizontal" className="d-flex align-items-center justify-content-around">
                    <div className="d-flex flex-column">
                        <label>Rent price:</label>
                        <InputNumber addonBefore="+" addonAfter="€" value={yachtData?.rent_price ?? 0}
                                     color="white" step={10000} name="rent_price"
                                     onChange={(value) => setData("rent_price", value)}/>
                    </div>
                    <div className="d-flex flex-column">
                        <label>Sale price:</label>
                        <InputNumber addonBefore="+" addonAfter="€" value={yachtData?.sale_price ?? 0}
                                     color="white" step={100} name="sale_price"
                                     onChange={(value) => setData("sale_price", value)}/>
                    </div>
                </Space>
                <div className="form-group">
                    <label>Description</label>
                    <TextArea type="text" className="form-control" value={yachtData?.description}
                              onChange={handleInputChange} name="description"/>
                </div>
                <Space direction="horizontal" className="w-100 d-flex justify-content-around">
                    <DatePicker value={yachtData?.year ? dayjs(yachtData.year) : dayjs()} size="large"
                                onChange={(date, dateString) => {
                                    setData("year", dateString)
                                }}
                                disabledDate={disabledDate} name="year"/>
                    <div className="mt-4">
                        <Dropdown.Button menu={modelsMenu} size="large" onClick={handleModelClick} name="model_id"
                                         className="ant-dropdown-menu">
                            Select model
                        </Dropdown.Button>
                        <p className="text-center p-0 m-0"><a href="/model/create">new model?</a></p>
                    </div>
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