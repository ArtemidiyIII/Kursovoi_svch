import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const RiverBar = observer(() => {
    const {raftings} = useContext(Context)

    const handleRiverClick = (river) => {
        if (raftings.selectedRiver.id === river.id) {
            raftings.setSelectedRiver({});
            localStorage.removeItem('selectedRiver'); 
        } 
        else {
            raftings.setSelectedRiver(river);
            localStorage.setItem('selectedRiver', JSON.stringify(river)); 
        }
    };

    return (
        <ListGroup>
            {raftings.rivers.map( river => 
                <ListGroup.Item
                    style = {{cursor: 'pointer'}}
                    active = {river.id === raftings.selectedRiver.id}
                    onClick = {() => handleRiverClick(river)}
                    key = {river.id}
                    className="p-3"
                >
                    {river.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
});

export default RiverBar;