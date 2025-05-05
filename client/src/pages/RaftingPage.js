import React  from 'react';
import {Container} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import star from '../assets/StarB.png';

const RaftingPage = () => {
    const raftings = {id: 1, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`}

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image 
                        wight={300}
                        height={300}
                        src={raftings.img}
                    />
                </Col>
                <Col md={4}>
                    <Row className='d-flex align-items-center'>
                        <h2>{raftings.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{background:`url(${star}) no-repeat center center `,
                            cursor: 'pointer', 
                            width:240, 
                            height:240, 
                            backgroundSize: 'cover', 
                            fontSize:48 }}
                        />
                        {raftings.rating}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className='d-felx flex-column align-items-center justify-content-around'
                    style={{width:300,height:300,fontSize:28, border:'5px solid lightgray'}}>
                        <h3>{raftings.name}</h3>
                        <h3>Цена: {raftings.price} руб.</h3> 
                        <Button variant="outline-dark" /*onClick={handleAddToBasket}*/>Забронировать</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default RaftingPage;