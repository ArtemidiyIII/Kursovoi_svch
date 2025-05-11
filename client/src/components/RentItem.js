import React, {useContext} from "react";
import {Col} from "react-bootstrap";
import {Card} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { observer } from 'mobx-react-lite';
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { RENTPAGE_ROUTE } from '../utils/consts'

const RentItem = observer(({rented_items}) => {
    const {rented_items: rentStore} = useContext(Context);
    if(!rentStore || !rentStore.brands) {
        return <div>brand not found</div>
    }
    const brand = rentStore.brands.find((brand) => brand.id === rented_items.brandId);
    const navigate = useNavigate();
    

    return (
        <Col md = {3} className="mt-3" onClick = {() => navigate(RENTPAGE_ROUTE + '/' + rented_items.id)}>
            <Card style = {{wight: 150, cursor: 'pointer',}} border = {"light"}>
                <Image wight={150} height={150} src={process.env.REACT_APP_API_URL + '/static/' + rented_items.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="ms-1">{brand ? brand.name : 'Unknown Brand'}</div>
                </div>
                <div className="ms-2">{rented_items.name}</div>
                <div className="ms-3">{rented_items.price} руб.</div>
            </Card>
        </Col>
    );
});

export default RentItem;