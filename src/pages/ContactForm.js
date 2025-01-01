import {Dropdown, Input, Menu, Space} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import { MdEmail } from "react-icons/md";
import TextArea from "antd/lib/input/TextArea";
import Button from "react-bootstrap/Button";
import React from "react";
import {useNavigate} from "react-router-dom";


const ContactForm = () => {

    const items = [
        {label: 'Service'},
        {label: 'Complaint'},
        {label: 'Sales'},
        {label: 'Rents'},
        {label: 'Other'},
    ];

    const menu = (
        <Menu>
            {items.map((item) => (
                <Menu.Item style={{ textAlign: "center" }}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    const navigate = useNavigate();

    return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            <Button className="position-absolute top-0 start-0 ms-2 mt-1 px-3"
                    onClick={() => navigate(-1)}>Back</Button>
            <div id="contact-form" className="w-50 h-50 d-flex flex-column justify-content-around align-items-center">
                <h1 className="text-center fw-bold">CONTACT FORM</h1>
                <div className="d-flex w-100 gap-3">
                    <Input size="large" placeholder="Full name" suffix={<UserOutlined />}/>
                    <Input size="large" placeholder="Your email" suffix={<MdEmail/>} />
                </div>
                <Dropdown overlay={menu} className="w-100">
                    <Button className="bg-white text-primary">Choose category</Button>
                </Dropdown>
                <TextArea placeholder="Your message" autoSize={{ minRows: 7, maxRows: 20 }} />
                <Button className="w-100 py-2 bg-light text-primary">SUBMIT</Button>
            </div>
        </div>
    )
}

export default ContactForm;