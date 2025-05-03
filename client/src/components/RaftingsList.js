import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';
import Row from 'react-bootstrap/Row';
import RaftingItem from '../components/RaftingItem';

const RaftingList = observer(() => {
    const {rafting} = useContext(Context)

    return (
        <Row className = "d-flex">
            {rafting.raftings.map(rafting =>
                <RaftingItem key={rafting.id} rafting ={rafting}/>
            )}
        </Row>
    )
})

export default RaftingList;