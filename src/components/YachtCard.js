import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const yachtCard = ({ yacht, onButtonClick }) => {
    const show = ["available for sale", "available for rent and sale"].includes(yacht.status.name)
    return (<Card style={{ width: '30%' }} className="my-2">
        <Card.Img variant="top" src={yacht.picture} />
        <Card.Body>
            <Card.Title>{yacht.name}</Card.Title>
            <Card.Text>
                {yacht.description}
            </Card.Text>
            <div className="d-flex w-100 justify-content-between align-items-center">
                <Card.Subtitle className="text-danger pb-1">{yacht.status.name}</Card.Subtitle>
                {show &&
                    <Card.Subtitle className="text-info pb-1">price: {yacht.sale_price}€</Card.Subtitle>
                }
            </div>
            <Button variant="primary" onClick={onButtonClick}>Go to details</Button>
        </Card.Body>
    </Card>
    );
}

export default yachtCard;