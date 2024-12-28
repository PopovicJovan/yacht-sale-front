import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const yachtCard = ({ yacht }) => {
    return (<Card style={{ width: '30%' }} className="my-2">
        <Card.Img variant="top" src={yacht.picture} />
        <Card.Body>
            <Card.Title>{yacht.name}</Card.Title>
            <Card.Text>
                {yacht.description}
            </Card.Text>
            <Button variant="primary">Go to details</Button>
        </Card.Body>
    </Card>
    );
}

export default yachtCard;