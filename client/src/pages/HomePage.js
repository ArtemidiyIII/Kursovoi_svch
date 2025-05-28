import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { RAFTINGCATALOG_ROUTE, RENTCATALOG_ROUTE, FAQ_ROUTE } from '../utils/consts';
import { Container } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();

    return(
        <div>
            <Carousel>
                <Carousel.Item>
                    <div
                        className="d-block w-100"
                        style={{
                            height: '400px',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_API_URL}/static/splav1.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat', 
                        }}
                    >
                    </div>
                    <Carousel.Caption>
                        <NavLink className="ms-auto" style={{color:'white'}} to= {RAFTINGCATALOG_ROUTE}>СПЛАВЫ НА БАЙДАРКАХ</NavLink>
                        <p>Бронирование сплавов на байдарках</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div
                        className="d-block w-100"
                        style={{
                            height: '400px',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_API_URL}/static/Tyroborydovanie1.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat', 
                        }}
                    >    
                    </div>
                    <Carousel.Caption>
                        <NavLink className="ms-auto" style={{color:'white'}} to={RENTCATALOG_ROUTE}>ДОПОЛНИТЕЛЬНОЕ СНАРЯЖЕНИЕ</NavLink>
                        <p>Прокат дополнительного снаряжения</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div
                        className="d-block w-100"
                        style={{
                            height: '400px',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_API_URL}/static/splav5.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat', 
                        }}
                    >
                    </div>
                    <Carousel.Caption>
                        <NavLink className="ms-auto" style={{color:'white'}} to={FAQ_ROUTE}>ВОПРОСЫ и ОТВЕТЫ</NavLink>
                        <p>ответы на часто задаваемые вопросы</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Container>
                <Row className="mt-5 justify-content-center">
                    <Col md={6} className="text-center">
                        <h1>Добро пожаловать!</h1>
                        <p>Это главная страница приложения.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;