import React, {useContext, useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {Card} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import star from '../assets/StarB.png';
import { observer } from 'mobx-react-lite';
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import {fetchRatingsByRaftingId} from '../http/raftingAPI'
import { RAFTINGPAGE_ROUTE } from '../utils/consts'

const RaftingItem = observer(({raftings}) => {
    const {raftings: raftingsStore} = useContext(Context);
    const [averageRating, setAverageRating] = useState(0);
    if(!raftingsStore || !raftingsStore.weekdays) {
        return <div>weekday not found</div>
    }
    const weekday = raftingsStore.weekdays.find((weekday) => weekday.id === raftings.weekdayId);
    const navigate = useNavigate();
    useEffect(() => {
        fetchRatingsByRaftingId(raftings.id)
        .then((data) => {
            calculateAverageRating(data);
        })
    }, [raftings.id])
    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0)
        {
            setAverageRating(0);
            return;
        }
        const sum = ratings.reduce((acc, r) => acc + r.rate, 0);
        setAverageRating((sum / ratings.length).toFixed(1));
    }


    return (
        <Col md = {3} className="mt-3" onClick = {() => navigate(RAFTINGPAGE_ROUTE + '/' + raftings.id)}>
            <Card style = {{wight: 150, cursor: 'pointer',}} border = {"light"}>
                <Image wight={150} height={150} src={process.env.REACT_APP_API_URL + '/static/' + raftings.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="ms-1">{weekday ? weekday.name : 'День не указан'}</div>
                    <div className="d-flex align-items-center">
                        <div>{averageRating > 0 ? `${averageRating}` : 'No rate'}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div className="ms-2">{raftings.name}</div>
                <div className="ms-3">
                    {raftings.discount_price < raftings.price ? (
                        <span>
                        <span style={{textDecoration: 'line-through'}}>{raftings.priсe}</span> <span>{raftings.discount_price}</span>
                    </span>
                    ) : 
                    (
                        <span>{raftings.price}</span>
                    )}
                </div>
            </Card>
        </Col>
    );
});

export default RaftingItem;