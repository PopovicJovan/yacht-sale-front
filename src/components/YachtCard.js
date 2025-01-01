import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import ApiService from "../api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import React, {useEffect, useState} from "react";
import {Calendar, Space} from "antd";
import dayjs from "dayjs";

const YachtCard = ({yacht, showUpdate=false}) => {
    const showSale = ["available for sale", "available for rent and sale"].includes(yacht.status.name);
    const showRent = ["available for rent", "available for rent and sale", "rented"].includes(yacht.status.name);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState();
    const [yachtId, setYachtId] = useState();
    const [bookedDates, setBookedDates] = useState([]);
    const navigate = useNavigate();
    ApiService.init();
    ApiService.setHeader();

    const MySwal = withReactContent(Swal);
    const MyAlert = (action) => {
        return MySwal.fire({
            title: 'Are you sure?',
            text: `You are about to ${action} this yacht!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${action} it!`,
        })
    }


    const deleteYacht = async (id) => {
        MyAlert("delete").then(async (result) => {
            if (result.isConfirmed) {
                const response = await ApiService.delete(`/yacht/${id}`);
                if (response.status === 204){
                    MySwal.fire('Deleted!', 'Your item has been deleted.', 'success').then(result =>{
                        if (result.isConfirmed) navigate(0);
                    });
                }else{
                    navigate("/");
                }
            }
        });
    }

    const buyYacht = async (id) => {
        MyAlert("buy").then(async (result) => {
            if (result.isConfirmed) {
                const response = await ApiService.post(`/yacht/${id}/buy`);
                if (response.status === 200){
                    MySwal.fire('Success!', 'You have successfully bought this yacht.', 'success').then(result =>{
                        if (result.isConfirmed) navigate(0);
                    });
                }else{
                    navigate("/");
                }
            }
        });
    }

    const rentYacht = async (id) => {
        await fetchBookedDates();
        setYachtId(id);
        if(startDate && endDate && yachtId){
            MyAlert("rent").then(async (result) => {
                if (result.isConfirmed) {
                    const response = await ApiService.post(`/rents`, {
                        yacht_id: yachtId,
                        start_date: dayjs(startDate).format('YYYY-MM-DD'),
                        end_date: dayjs(endDate).format('YYYY-MM-DD')
                    });
                    if (response.status === 200){
                        MySwal.fire('Success!', 'You have successfully rented this yacht.', 'success')
                            .then(result => {
                                if (result.isConfirmed) navigate(0);
                            });
                    } else if(response.status === 422) MySwal.fire('Error!', response.error, 'error')
                    else navigate("/");
                }
            })
        }else setShowModal(true);
    }



    const fetchBookedDates = async () => {
        try {
            const response = await ApiService.get(`/yacht/${yacht.id}/active-rents`);
            setBookedDates(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const disabledStartDate = (current) => {
        if (!current) return false;
        if (current <= dayjs().endOf("day")) return true;
        if (endDate && current > dayjs(endDate).subtract(1, "day")) return true;
        return bookedDates.some((date) => {
            const startDate = dayjs(date.start_date).startOf("day");
            const endDate = dayjs(date.end_date).endOf("day");
            return current >= startDate && current <= endDate;
        });
    };

    const disabledEndDate = (current) => {
        if(!current) return false;
        if (current < dayjs().endOf('day')) return true;
        if(startDate && current < dayjs(startDate).add(1, "day")) return true;
        return bookedDates.some((date) => {
            const startDate = dayjs(date.start_date).startOf("day");
            const endDate = dayjs(date.end_date).endOf("day");
            return current >= startDate && current <= endDate;
        })
    };
    useEffect(() => {
        disabledStartDate();
        disabledStartDate();
    }, [startDate, endDate]);

    const handleButton = async () => {
        if(startDate && endDate){
            setShowModal(false);
            await rentYacht(yachtId);
        }
    }
    const closeModal = () => {
        setStartDate(false);
        setEndDate(false);
        setYachtId(false);
        setShowModal(false);
    }
    return (
        <>
            {showModal && (
                <div className="vh-100 w-100 d-flex justify-content-center align-items-center position-fixed top-0" style={{zIndex: "10000", backdropFilter: "blur(10px)"}}>
                    <Button className="position-absolute top-0 start-0 ms-2 mt-1 px-3" onClick={() => closeModal()}>
                        Exit page
                    </Button>
                    <div className="w-75 h-75 border border-5 rounded rounded-5 bg-white d-flex flex-column justify-content-center align-items-center" id="rent-date-choose">
                        <h1 className="text-center">Choose dates</h1>
                        <Space className="w-75">
                            <Calendar fullscreen={false} disabledDate={disabledStartDate} onChange={(date) => setStartDate(date)}/>
                            <Calendar fullscreen={false} disabledDate={disabledEndDate} onChange={(date) => setEndDate(date)}/>
                        </Space>
                        <Button className="w-75 me-2" onClick={handleButton}>SUBMIT</Button>
                    </div>
                </div>
            )}
        <Card style={{ width: '30%'}} className="my-2">
            <Card.Img variant="top" src={yacht.picture ?? "/Images/no-img.jpg"} style={{height: "40vh"}} className="img-fluid"/>
            <Card.Body>
                <Card.Title>{yacht.name}</Card.Title>
                <Card.Text style={{height: "70px", overflow: "hidden"}}>
                    {yacht.description}
                </Card.Text>
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <Card.Subtitle className="text-danger pb-1">
                        {yacht.status.name}
                    </Card.Subtitle>
                    {showSale &&
                        <Card.Subtitle className="text-info pb-1">
                            price: {yacht.sale_price}€
                        </Card.Subtitle>
                    }
                </div>
                <div className="d-flex">
                    <Button variant="primary" onClick={() => navigate(`/yachts/${yacht.id}`)}>Go to details</Button>
                    {!showUpdate ? (
                        <>
                            {
                                showRent && (
                                    <Button variant="primary" onClick={() => rentYacht(yacht.id)}
                                            className="ms-2">
                                        Rent yacht
                                    </Button>
                                )
                            }
                            {
                             showSale && (
                                    <Button variant="primary" onClick={() => buyYacht(yacht.id)}
                                            className="ms-2">
                                        Buy yacht
                                    </Button>
                                )
                            }
                        </>
                    )
                    :
                        (
                        <>
                            <Button variant="success" onClick={() => navigate(`/yachts/${yacht.id}/update`)}
                                    className="ms-2">Update yacht
                            </Button>
                            <Button variant="danger" onClick={() => deleteYacht(yacht.id)}
                                    className="ms-2">
                                Delete yacht
                            </Button>
                        </>
                        )
                }
                </div>
            </Card.Body>
        </Card>
        </>
    );
}

export default YachtCard;