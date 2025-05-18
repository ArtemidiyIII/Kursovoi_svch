import React, {useState, useEffect, useContext}  from 'react';
import {Container} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import star from '../assets/StarB.png';
import { Context } from '../../src/index'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {fetchOneRaftings, addToOrdersRafting, getOrdersRafting, fetchRatingsByRaftingId} from '../http/raftingAPI'
import { RATING_ROUTE} from '../utils/consts'

const RaftingPage = () => {
    const [raftings, setRaftings] = useState({info:[]})
    const {id} = useParams()
    const [averageRating, setAverageRating] = useState(0);
    const [ratings, setRatings] = useState([]); 
    const { user } = useContext(Context)
     
    useEffect(() => {
        fetchOneRaftings(id).then(data=> {
            setRaftings(data);
        });
        fetchRatingsByRaftingId(id)
            .then((data) => {
                setRatings(data);
                calculateAverageRating(data);})
    }, [id]);
    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) {
            setAverageRating(0);
        return;
        }
        const sum = ratings.reduce((acc, r) => acc + r.rate, 0);
        setAverageRating((sum / ratings.length).toFixed(1));
    };

    const handleAddToOrders = async () => {
        try {
            console.log(raftings.id, user.user.id)
            const currentOrders = await getOrdersRafting(user.user.id);
            if (currentOrders.some(item => item === raftings.id)) { 
                alert('Этот сплав уже был вами забронирован');
                return;
            }
            await addToOrdersRafting(raftings.id, user.user.id);
            alert('Сплав успешно забронирован');
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
                    {raftings.img ? (
                        <Image 
                            wight={300}
                            height={300}
                            src={`${process.env.REACT_APP_API_URL}/static/${raftings.img}`}
                            thumbnail
                        />
                    ) : (<div>Loading image...</div>)}
                </Col>
                <Col md={4}>
                    <Row className='d-flex align-items-center'>
                        <h2>{raftings.name}</h2>
                        <Link to={RATING_ROUTE+ '/' + raftings.id}>
                            <div
                            className='d-flex align-items-center justify-content-center'
                            style={{background:`url(${star}) no-repeat center center `,
                            cursor: 'pointer', 
                            width:240, 
                            height:240, 
                            backgroundSize: 'cover', 
                            fontSize:48 }}
                            >
                                {averageRating > 0 ? `${averageRating}` : 'No rate'}
                            </div>
                        </Link>
                        {raftings.rating}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className='d-felx flex-column align-items-center justify-content-around'
                    style={{width:300,height:300,fontSize:28, border:'5px solid lightgray'}}>
                        <h3>{raftings.name}</h3>
                        <h3>Цена: {raftings.price} руб.</h3> 
                        <Button variant="outline-dark" onClick={handleAddToOrders}>Забронировать</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Дополнительная информация</h1>
                {raftings.info && raftings.info.length > 0 ? (
                    raftings.info.map((info, index) => (
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