import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../src/index';
import { Container, Table, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { getOrdersRafting, fetchOneRaftings, removeFromOrdersRafting, fetchOrdersRaftingId } from '../http/raftingAPI';

const OrdersRafting = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true); // Начинаем с true, пока данные не загружены
    const [error, setError] = useState(null);
    const [orderId, setOrdersId] = useState(null);
    const [ordersraftingItems, setOrdersRaftingItems] = useState([]); 
    const [raftingsData, setRaftingsData] = useState({}); 

    useEffect(() => {
        if (user.user.id) {
            setIsLoading(true);
            getOrdersRafting(user.user.id)
                .then(async (response) => {
                    if (response && response.length > 0) {
                        setOrdersRaftingItems(response);
            
                        const raftings = await Promise.all(
                            response.map(async (item) => {
                                const data = await fetchOneRaftings(item);
                                return { [item]: data };
                            })
                        );
                        setRaftingsData(Object.assign({}, ...raftings));
                    } else {
                        setOrdersRaftingItems([]);
                        setRaftingsData({}); // Важно сбросить, если нет данных
                    }
                 })
                .catch((error) => {
                    setError('Произошла ошибка при загрузке заказов бронирования сплавов');
                })
                .finally(() => {
                    setIsLoading(false); // В любом случае завершаем загрузку
                });
        }
    }, [user.user.id]);


    useEffect(() => {
        if (user.user.id) {
            fetchOrdersRaftingId(user.user.id)
                .then((orderId) => setOrdersId(orderId))
                .catch((error) => console.error("Ошибка при получении orderId", error));
        }
    }, [user.user.id]);


    const handleRemoveFromOrdersRafting = (raftingId) => {
        if (!orderId) {
            alert('Список заказов бронирования сплавов не найден.');
            return;
        }

        removeFromOrdersRafting(orderId, raftingId)
            .then((response) => {
                alert(response.message);
                // Обновляем состояние более эффективно
                setOrdersRaftingItems(prevItems => prevItems.filter(item => item !== raftingId));
                setRaftingsData(prevData => {
                    const { [raftingId]: deleted, ...updatedData } = prevData; // Удаляем raftingId из объекта
                    return updatedData;
                });
            })
            .catch(() => alert('Ошибка при удалении сплава'));
    };


    return (
        <Container>
            <h1>Список заказов бронирования сплавов</h1>
            {isLoading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название сплава</th>
                            <th>Цена</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersraftingItems.map((item) => {
                            const rafting = raftingsData[item];
                            if (rafting) {
                                return (
                                    <tr key={rafting.id}>
                                        <td>{rafting.id}</td>
                                        <td>{rafting.name}</td>
                                        <td>{rafting.price} руб.</td>
                                        <td>                                
                                            <Button
                                                variant="danger" 
                                                onClick={() => handleRemoveFromOrdersRafting(item)}
                                            >
                                                Отменить бронирование
                                            </Button>                                
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null; // Или можно вернуть какой-то placeholder
                            }
                        })}
                    </tbody>
                </Table>
            )}
        </Container>
    );
});

export default OrdersRafting;