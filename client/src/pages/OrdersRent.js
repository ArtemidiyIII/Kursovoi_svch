import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../src/index';
import { Container, Table, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { getOrdersRent, fetchOneRentedItems, removeFromOrdersRent, fetchOrdersRentId } from '../http/rentItemAPI';

const OrdersRent = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true); // Начинаем с true, пока данные не загружены
    const [error, setError] = useState(null);
    const [orderId, setOrdersId] = useState(null);
    const [ordersrentItems, setOrdersRentItems] = useState([]); 
    const [rentsData, setRentsData] = useState({}); 

    useEffect(() => {
        if (user.user.id) {
            setIsLoading(true);
            getOrdersRent(user.user.id)
                .then(async (response) => {
                    if (response && response.length > 0) {
                        setOrdersRentItems(response);
            
                        const rentitems = await Promise.all(
                            response.map(async (item) => {
                                const data = await fetchOneRentedItems(item);
                                return { [item]: data };
                            })
                        );
                        setRentsData(Object.assign({}, ...rentitems));
                    } else {
                        setOrdersRentItems([]);
                        setRentsData({}); // Важно сбросить, если нет данных
                    }
                 })
                .catch((error) => {
                    setError('Произошла ошибка при загрузке заказов проката снаряжения');
                })
                .finally(() => {
                    setIsLoading(false); // В любом случае завершаем загрузку
                });
        }
    }, [user.user.id]);


    useEffect(() => {
        if (user.user.id) {
            fetchOrdersRentId(user.user.id)
                .then((orderId) => setOrdersId(orderId))
                .catch((error) => console.error("Ошибка при получении orderId", error));
        }
    }, [user.user.id]);


    const handleRemoveFromOrdersRafting = (rentedItemId) => {
        if (!orderId) {
            alert('Список оформленного в прокат снаряжения не найден.');
            return;
        }

        removeFromOrdersRent(orderId, rentedItemId)
            .then((response) => {
                alert(response.message);
                // Обновляем состояние более эффективно
                setOrdersRentItems(prevItems => prevItems.filter(item => item !== rentedItemId));
                setRentsData(prevData => {
                    const { [rentedItemId]: deleted, ...updatedData } = prevData; // Удаляем rentedItemId из объекта
                    return updatedData;
                });
            })
            .catch(() => alert('Ошибка при удалении снаряжения'));
    };


    return (
        <Container>
            <h1>Список оформленного в прокат снаряжения</h1>
            {isLoading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название снаряжения</th>
                            <th>Цена проката</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersrentItems.map((item) => {
                            const rentitem = rentsData[item];
                            if (rentitem) {
                                return (
                                    <tr key={rentitem.id}>
                                        <td>{rentitem.id}</td>
                                        <td>{rentitem.name}</td>
                                        <td>{rentitem.price} руб.</td>
                                        <td>                                
                                            <Button
                                                variant="danger" 
                                                onClick={() => handleRemoveFromOrdersRafting(item)}
                                            >
                                                Отменить прокат снаряжения
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

export default OrdersRent;