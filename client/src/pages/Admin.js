import React, { useContext, useState, useEffect } from 'react'; 
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import {  useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { USERMANAGEMENT_ROUTE, RAFTINGMANAGEMENT_ROUTE,  RENTMANAGEMENT_ROUTE} from "../utils/consts";



const Admin = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();
    

    /*const handleUsersManagement = () => {
        navigate('/usermanagement'); // Перенаправление на страницу управления пользователями
    };

    const handleRentalsManagement = () => {
        // Логика для управления прокатами
        console.log('Управление прокатами');
    };

    const handleRaftingManagement = () => {
        // Логика для управления сплавами на байдарках
        console.log('Управление сплавами на байдарках');
    };*/

    const handleOrdersReport = () => {
        // Логика для отчета по заказам на сплавы
        console.log('Отчет по заказам на сплавы');
    };

    const handleBlockedUsersReport = () => {
        // Логика для отчета по заблокированным пользователям
        console.log('Отчет по заблокированным пользователям');
    };

    const handleRatingsReport = () => {
        // Логика для отчета по рейтингам сплавов
        console.log('Отчет по рейтингам сплавов');
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col md={4}>
                    <Button variant="primary" onClick={()=> navigate(USERMANAGEMENT_ROUTE)} style={{ width: '100%' }}>
                        Управление пользователями
                    </Button>
                </Col>
                <Col md={4}>
                    <Button variant="primary" onClick={()=> navigate(RENTMANAGEMENT_ROUTE)} style={{ width: '100%' }}>
                        Управление прокатами
                    </Button>
                </Col>
                <Col md={4}>
                    <Button variant="primary" onClick={()=> navigate(RAFTINGMANAGEMENT_ROUTE)} style={{ width: '100%' }}>
                        Управление сплавами на байдарках
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={4}>
                    <Button variant="success" onClick={handleOrdersReport} style={{ width: '100%' }}>
                        Отчет по заказам на сплавы
                    </Button>
                </Col>
                <Col md={4}>
                    <Button variant="success" onClick={handleBlockedUsersReport} style={{ width: '100%' }}>
                        Отчет по заблокированным пользователям
                    </Button>
                </Col>
                <Col md={4}>
                    <Button variant="success" onClick={handleRatingsReport} style={{ width: '100%' }}>
                        Отчет по рейтингам сплавов
                    </Button>
                </Col>
            </Row>
        </Container>
    )
})

export default Admin;