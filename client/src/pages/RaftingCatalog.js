import React from 'react';
import {Container} from "react-bootstrap"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RiverBar from '../components/RiverBar';

const RaftingCatalog = () => {
    return (
        <Container>
            <Row className="mt-2">
                <Col md = {3}>
                    <RiverBar/>
                </Col>
                <Col md = {9}>

                </Col>
            </Row>
        </Container>
    )
}

export default RaftingCatalog;