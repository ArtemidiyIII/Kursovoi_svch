import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const RiverBar = observer(() => {
    const {raftings} = useContext(Context)
    return (
        <ListGroup>
            {raftings.rivers.map( river => 
                <ListGroup.Item
                    style = {{cursor: 'pointer'}}
                    active = {river.id === raftings.selectedRiver.id}
                    onClick = {() => raftings.setSelectedRiver(river)}
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