import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, banUser } from '../http/userAPI';

const UserManagement = observer(({ currentUserRole }) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data))
            .catch(error => console.error("Ошибка при загрузке пользователей:", error));
    }, []);

    const handleBanUser = async (userId, isBlocked) => {
        try {
            await banUser(userId, isBlocked); // Отправляем текущее значение isBlocked (true = заблокирован)
            setUsers(users.map(user =>
                user.id === userId ? { ...user, block: !user.block } : user // Инвертируем значение block
            ));
        } catch (error) {
            console.error("Ошибка при блокировке/разблокировке пользователя:", error);
        }
    };

    return (
        <Container>
            <h1>Управление пользователями</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Заблокирован</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.block ? 'Да' : 'Нет'}</td> {/* Исправлено отображение статуса */}
                            <td>
                                {user.role !== 'ADMIN' ? (
                                    <Button
                                        variant={user.block ? 'danger' : 'success'} // Исправлены варианты кнопок
                                        onClick={() => handleBanUser(user.id, user.block)} // Отправляем текущее значение block
                                    >
                                        {user.block ? 'Разблокировать' : 'Заблокировать'} {/* Исправлены надписи на кнопках */}
                                    </Button>
                                ) : (
                                    <span>-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default UserManagement;