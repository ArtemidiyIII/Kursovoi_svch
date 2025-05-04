import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';
import Row from 'react-bootstrap/Row';
import RaftingItem from '../components/RaftingItem';

const RaftingList = observer(() => {
    const {raftings} = useContext(Context)

    return (
        <Row className = "d-flex">
            {raftings.raftings.map(raftings =>
                <RaftingItem key={raftings.id} raftings ={raftings}/>
            )}
        </Row>
    )
})

export default RaftingList;