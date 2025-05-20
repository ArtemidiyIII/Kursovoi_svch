import React, { useContext, useState, useEffect } from 'react'; 
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import {  useNavigate } from 'react-router-dom';
import {RAFTINGCATALOG_ROUTE, RENTCATALOG_ROUTE, ORDERSRAFTING_ROUTE, ORDERSRENT_ROUTE, ADMIN_ROUTE} from '../utils/consts'
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
const UserProfile = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();


    return (
        <Container size="lg" className='mt-5 d-flex justify-content-center align-items-center'>
            <Card  style={{ borderRadius: '10px' }}>
                <Row className='mb-3 mt-2 '>
                    <Col className='d-flex'>
                        <Button className='py-3 mx-2 w-100' variant="secondary" onClick={() => navigate(RAFTINGCATALOG_ROUTE)}>Забронировать сплав</Button>
                    
                        <Button className='py-3 mx-2 w-100' variant="secondary" onClick={() => navigate(RENTCATALOG_ROUTE)}>Прокат снаряжения</Button>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col className='mx-2'>
                        <h2>Информация о пользователе</h2>
                        <p>Email: {user.user.email}</p>
                        <p>Role: {user.user.role}</p>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col className='d-flex'>
                        <Button className='py-3 mx-2 w-100' variant="secondary" onClick={() => navigate(ORDERSRAFTING_ROUTE)}>Мои сплавы</Button>
                    
                        <Button className='py-3 mx-2 w-100' variant="secondary" onClick={() => navigate(ORDERSRENT_ROUTE)}>Мой список снаряжения</Button>
                    </Col>
                </Row>
                {user.user.role === 'ADMIN' && (      
                    <Row className='mb-2 mt-1'>
                        <Col className='d-flex'>
                            <Button className='py-3 mx-2 w-100' variant="secondary" onClick={() => navigate(ADMIN_ROUTE)}>Админ-панель</Button>                    
                        </Col>
                    </Row>
                )}
            </Card>
        </Container>        
    )

})

export default UserProfile;