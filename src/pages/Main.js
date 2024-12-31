import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Footer from "./Footer";
import ApiService from "../api";
import YachtCard from "../components/YachtCard";
import React, {useEffect, useState} from "react";

const Main = () => {
    ApiService.init();
    const [yachts, setYachts] = useState([]);
    useEffect(() => {
        const getYachts = async () =>{
            const response = await ApiService.get("/yacht");
            if (response.status === 200) {
                setYachts(response.data.yachts)
            }
            else{
                return alert(response.error);
            }
        }
        getYachts();
    }, []);

    return (
        <>
            <Navbar/>
            <div className="main-bg">
                <div className="h-100 w-100 d-flex justify-content-flex align-items-start px-5">
                <div id="description" className="w-50 h-50 pt-5 d-flex flex-column justify-content-between">
                    <h2 className="main-page-heading">Elegance on Water</h2>
                    <h5 style={{color: "#800000"}}>
                        Embark on a journey like no other with our exclusive fleet of yachts.
                        Each vessel is designed to offer unparalleled comfort and sophistication.
                        Discover the freedom of luxury on the open water.
                    </h5>
                    <Button href="/yachts" className="w-50"><h5>View our yachts</h5></Button>
                </div>
            </div>
            </div>
            <div id="offer" className="pb-3">
                <h2 className="text-center fw-bold py-2">Take a look on our yachts</h2>
                <div className="d-flex flex-wrap justify-content-around">
                {yachts.slice(0,6).map((yacht) => (
                    <YachtCard key={yacht.id} yacht={yacht}/>
                ))}
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default Main