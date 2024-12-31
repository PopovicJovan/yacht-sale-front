import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import ApiService from "../api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const YachtCard = ({yacht, showUpdate=false}) => {
    const show = ["available for sale", "available for rent and sale"].includes(yacht.status.name);
    const navigate = useNavigate();
    ApiService.init();
    ApiService.setHeader();
    const deleteYacht = async (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
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
                    {showUpdate && (
                        <Button variant="danger" onClick={() => deleteYacht(yacht.id)} className="ms-2">Delete yacht</Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default YachtCard;