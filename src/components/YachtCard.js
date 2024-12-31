import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const YachtCard = ({yacht, showUpdate=false}) => {
    const show = ["available for sale", "available for rent and sale"].includes(yacht.status.name);
    const navigate = useNavigate();
    return (
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
                    {show &&
                        <Card.Subtitle className="text-info pb-1">
                            price: {yacht.sale_price}€
                        </Card.Subtitle>
                    }
                </div>
                <div className="d-flex">
                    <Button variant="primary" onClick={() => navigate(`/yachts/${yacht.id}`)}>Go to details</Button>
                    {showUpdate && (
                        <Button variant="success" onClick={() => navigate(`/yachts/${yacht.id}/update`)} className="ms-2">Update yacht</Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default YachtCard;