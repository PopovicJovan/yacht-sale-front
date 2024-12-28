import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";

const Main = () => {
    return (
        <div className="main-bg">
            <Navbar/>
            <div className="h-100 w-100 d-flex justify-content-start align-items-start">
                <div id="description" className="w-50 h-50 pt-5 d-flex flex-column justify-content-between">
                    <h2 className="main-page-heading">Elegance on Water</h2>
                    <h5 style={{color: "#800000"}}>
                        Embark on a journey like no other with our exclusive fleet of yachts.
                        Each vessel is designed to offer unparalleled comfort and sophistication.
                        Discover the freedom of luxury on the open water.
                    </h5>
                    <Button href="/" className="w-50"><h5>View our yachts</h5></Button>
                </div>
            </div>
        </div>
    )
}

export default Main