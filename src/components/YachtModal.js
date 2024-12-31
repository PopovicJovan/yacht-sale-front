import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ApiService from "../api";

const YachtModal = () => {
    const {id} = useParams();
    const [yacht, setYacht] = useState();
    const navigate = useNavigate();
    ApiService.init();
    const getYacht = async () => {
        if(id){
            const response = await ApiService.get(`/yacht/${id}`);
            if(response.status === 200){setYacht(response.data)}
            else{navigate("/")}
        }
    }
    useEffect(() => {
        getYacht();
    }, []);
    let status_text, sale_price, rent_price;
    if(yacht){
        status_text = yacht.status.name;
        sale_price = yacht.sale_price;
        rent_price = yacht.rent_price;
        if (yacht.status.name === "sold"){
            status_text = "Yacht is sold"
            sale_price = undefined;
            rent_price = undefined;
        }else if (yacht.status.name === "unavailable"){
            status_text = "Yacht is unavailable now"
            sale_price = undefined;
            rent_price = undefined;
        }else if(!["available for rent and sale", "available for sale"].includes(yacht.status.name)){
            status_text = "Yacht is unavailable for sale now"
            sale_price = undefined;
        }
    }


    return (
        <>
        {yacht && (
        <div className="w-100 position-fixed bottom-0 d-flex justify-content-center align-items-center bg-light"
             style={{zIndex: "10", height: "87%"}}>
            <div id="picture-div" className="w-50 h-75 p-5 d-flex justify-content-center align-items-center">
                <img className="w-100 h-100" src={yacht.picture ?? "Images/no-img.jpg"} alt="Yacht "/>
            </div>
            <div id="picture-div"
                 className="w-50 h-75 p-5 d-flex flex-column justify-content-center align-items-center">
                <div
                    className="position-absolute top-0 end-0 bg-danger text-white d-flex justify-content-center align-items-center"
                    style={{width: "30px", height: "30px", cursor: "pointer"}} onClick={() => navigate(-1)}>
                    X
                </div>
                <h1 className="p-0 m-0 display-5" style={{fontFamily: "Arial"}}>{yacht.name}</h1>
                <h6 className="text-black">{status_text}</h6>
                {sale_price && (<h6 className="text-black">Price: {sale_price}€</h6>)}
                <h4>Built: <span className="text-info">{yacht.year}</span></h4>
                <div className="d-flex flex-column justify-content-center w-100">
                    <h6>Length</h6>
                    <span className="h6 fw-bold">{yacht.model.length}m</span>
                    <div className="w-100" style={{height: "1px", backgroundColor: "black"}}></div>
                </div>
                <div className="d-flex flex-column justify-content-center w-100 mt-2">
                    <h6>Width</h6>
                    <span className="h6 fw-bold">{yacht.model.width}m</span>
                    <div className="w-100" style={{height: "1px", backgroundColor: "black"}}></div>
                </div>
                <div className="ps-2 pe-5 mt-2">{yacht.description}</div>
            </div>
        </div>
        )}
        </>
    )
}

export default YachtModal;