import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
    const {rented_items} = useContext(Context)

    const handleTypeClick = (type) => {
        if (rented_items.selectedType.id === type.id) {
            rented_items.setSelectedType({});
            localStorage.removeItem('selectedType'); 
        } 
        else {
            rented_items.setSelectedType(type);
            localStorage.setItem('selectedType', JSON.stringify(type)); 
        }
    };

    return (
        <ListGroup>
            {rented_items.types.map( type => 
                <ListGroup.Item
                    style = {{cursor: 'pointer', backgroundColor: 'lightgray'}}
                    active = {type.id === rented_items.selectedType.id}
                    onClick = {() => handleTypeClick(type)}
                    key = {type.id}
                    className="p-3"
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
});

export default TypeBar;