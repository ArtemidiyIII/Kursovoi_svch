import React, { useContext }  from "react";
import { observer } from "mobx-react-lite";
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";

const BrandBar = observer(() => {
    const {rented_items} = useContext(Context)
    return (
        <Row className = "d-flex">
            {rented_items.brands.map((brand) => (
                <Card
                    style={{
                        cursor: 'pointer',
                        width: 'auto',
                    }}
                    key ={brand.id}
                    className="p-3 ms-2"
                    onClick = {() => rented_items.setSelectedBrand(brand)}
                    border = {brand.id === rented_items.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    )
})

export default BrandBar;