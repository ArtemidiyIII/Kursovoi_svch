import React from "react";
import {Col} from "react-bootstrap";
import {Card} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import star from '../assets/StarB.png';
import { observer } from 'mobx-react-lite';

const RaftingItem = observer(({raftings}) => {

    return (
        <Col md = {3} className="mt-3">
            <Card style = {{wight: 150, cursor: 'pointer',}} border = {"light"}>
                <Image wight={150} height={150} src={raftings.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>В любой день</div>
                    <div className="d-flex align-items-center">
                        <div>{raftings.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{raftings.name}</div>
            </Card>
        </Col>
    );
});

export default RaftingItem;