import React, { useContext }  from "react";
import { observer } from "mobx-react-lite";
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";

const BrandBar = observer(() => {
    const {rented_items} = useContext(Context)

    const handleBrandClick = (brand) => {
        if (rented_items.selectedBrand.id === brand.id) {
            rented_items.setSelectedBrand({}); 
            localStorage.removeItem('selectedBrand');
        } 
        else {
            rented_items.setSelectedBrand(brand);
            localStorage.setItem('selectedBrand', JSON.stringify(brand));
        }
    };

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
                    onClick = {() => handleBrandClick(brand)}
                    border = {brand.id === rented_items.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    )
})

export default BrandBar;