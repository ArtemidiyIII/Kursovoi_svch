import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';
import Row from 'react-bootstrap/Row';
import RentItem from '../components/RentItem';

const RentItemsList = observer(() => {
    const {rented_items} = useContext(Context)

    return (
        <Row className = "d-flex">
            {rented_items.rented_items.map(rented_items =>
                <RentItem key={rented_items.id} rented_items ={rented_items}/>
            )}
        </Row>
    )
})

export default RentItemsList;