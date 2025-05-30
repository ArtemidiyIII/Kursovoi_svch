import React, {useState, useEffect, useContext}  from 'react';
import {Container} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Context } from '../../src/index'
import { useParams } from 'react-router-dom';
import {fetchOneRentedItems, addToOrdersRent, getOrdersRent} from '../http/rentItemAPI'

const RaftingPage = () => {
    const [rented_items, setRentedItems] = useState({info:[]})
    const {id} = useParams()
    const { user } = useContext(Context)
     
    useEffect(() => {
        fetchOneRentedItems(id).then(data=> {
            setRentedItems(data);
        });
    }, [id]);

    const handleAddToOrders = async () => {
        try {
            console.log(rented_items.id, user.user.id)
            const currentOrders = await getOrdersRent(user.user.id);
            /*if (currentOrders.some(item => item === rented_items.id)) { 
                alert('Это оборудование уже добавлено в прокат');
                return;
            }*/
            await addToOrdersRent(rented_items.id, user.user.id);
            alert('Прокат оборудования успешно оформлен');
        } 
        catch (error) {
            console.error(error);
            alert('Произошла ошибка');
        }
    };
  


    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    {rented_items.img ? (
                        <Image 
                            wight={300}
                            height={300}
                            src={`${process.env.REACT_APP_API_URL}/static/${rented_items.img}`}
                            thumbnail
                        />
                    ) : (<div>Loading image...</div>)}
                </Col>
                <Col md={4}>
                    <Row className='d-flex align-items-center'>
                        <h2>{rented_items.name}</h2>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className='d-felx flex-column align-items-center justify-content-around'
                    style={{width:300,height:300,fontSize:28, border:'5px solid lightgray'}}>
                        <h3>{rented_items.name}</h3>
                        <h3>Цена: {rented_items.price} руб.</h3> 
                        <Button variant="outline-dark" onClick={handleAddToOrders}>Оформить прокат</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Дополнительная информация</h1>
                {rented_items.info && rented_items.info.length > 0 ? (
                    rented_items.info.map((info, index) => (
                        <Row key={info.id} 
                        style={{ background: index % 2 === 0 ? 'lightgray' : 'darkgray', padding: 10 }}>
                            {info.title} : {info.description}
                        </Row>
                    ))
                ) : (
                    <div>Нет дополнительной информации</div>
                )}
            </Row>
        </Container>
    )
}

export default RaftingPage;