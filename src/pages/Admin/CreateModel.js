import Button from "react-bootstrap/Button";
import {DatePicker, Dropdown, Input, InputNumber, Space} from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiService from "../../api";

ApiService.init();
ApiService.setHeader();
const CreateModel = () => {
    const navigate = useNavigate();
    const [modelData, setModelData] = useState({
        name: "",
        manufacturer: "",
        length: 0,
        width: 0
    })
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const response = await ApiService.post("/model", modelData);
        if (response.status === 201) {
            navigate(-1);
        } else {
            navigate("/")
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setModelData({...modelData, [name]: value});
    }

    const handleData = (key, value) => {
        setModelData({...modelData, [key]: value});
    }

    return (
        <div id="top-div" className="w-100 vh-100 d-flex justify-content-center align-items-center position-fixed"
             style={{zIndex: "1001", backdropFilter: 'blur(10px)'}}>
            <div id="form"
                 className="w-50 h-75 border border-2 border-primary rounded rounded-5 p-3 d-flex justify-content-center align-items-center">
                <form>
                    <Button className="position-absolute top-0 end-0 me-2 mt-1" onClick={() => navigate(-1)}>Close
                        page</Button>
                    <div className="form-group">
                        <label>Name:</label>
                        <Input type="text" className="form-control" value={modelData?.name} onChange={handleInputChange}
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label>Manufacturer:</label>
                        <Input type="text" className="form-control" value={modelData?.manufacturer} onChange={handleInputChange}
                               name="manufacturer"/>
                    </div>
                    <Space direction="horizontal" className="d-flex align-items-center justify-content-around">
                        <div className="d-flex flex-column">
                            <label>length</label>
                            <InputNumber addonBefore="+" addonAfter="m" value={modelData?.length ?? 0}
                                         color="white" step={0.1} name="length"
                                         onChange={(value) => handleData("length", value)}/>
                        </div>
                        <div className="d-flex flex-column">
                            <label>width</label>
                            <InputNumber addonBefore="+" addonAfter="m" value={modelData?.width ?? 0}
                                         color="white" step={0.1} name="width"
                                         onChange={(value) => handleData("width", value)}/>
                        </div>
                    </Space>
                    <Button className="w-100 py-2 bg-light text-primary mt-2" onClick={handleSubmitForm}>SUBMIT</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateModel;