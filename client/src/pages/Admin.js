import React, { useContext, useState, useEffect } from 'react'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { fetchUsers } from '../http/userAPI';
import { fetchAllRatings } from '../http/raftingAPI';

const Admin = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        async function loadUsers() {
            setLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);
    
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleOrdersReport = () => {
        console.log('Отчет по заказам на сплавы');
    };

    const handleBlockedUsersReport = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            const bannedUsers = data.filter(user => user.block);

            if (bannedUsers.length === 0) {
                alert('Нет заблокированных пользователей');
                return;
            }

            const doc = new jsPDF();
            const header = ["id", "email", "role", "createdAt"];
            const body = bannedUsers.map(user => [user.id, user.email, user.role, user.createdAt]);

            doc.setFontSize(12);
            autoTable(doc, {
                head: [header],
                body: body,
                startY: 20,
            });

            doc.save(`banned_users_${new Date().toISOString().slice(0, 10)}.pdf`);
            alert('PDF отчет создан');
        } catch (error) {
            console.error("Ошибка при генерации PDF:", error);
            alert('Ошибка создания отчёта: '+ error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRatingsReport = async () => {
    setLoading(true);
    try {
        const allRatings = await fetchAllRatings();
        if (allRatings.length === 0) {
            alert('Нет рейтингов для сплавов');
            return;
        }

        // Группируем рейтинги по raftingId
        const ratingsMap = {};
        allRatings.forEach(rating => {
            if (!ratingsMap[rating.raftingId]) {
                ratingsMap[rating.raftingId] = {
                    total: 0,
                    count: 0,
                };
            }
            ratingsMap[rating.raftingId].total += rating.rate;
            ratingsMap[rating.raftingId].count += 1;
        });

        // Вычисляем средний рейтинг для каждого сплава
        const reportData = Object.entries(ratingsMap).map(([raftingId, { total, count }]) => {
            const averageRating = (total / count).toFixed(2); // Округляем до двух знаков после запятой
            return [raftingId, averageRating]; // Добавляем raftingId и средний рейтинг
        });

        const doc = new jsPDF();
        const header = ['Rafting ID', 'Average Rating'];
        
        doc.setFontSize(12);
        autoTable(doc, {
            head: [header],
            body: reportData,
            startY: 20,
        });

        doc.save(`all_rafting_ratings.pdf`);
        alert('PDF отчет создан');
    } catch (error) {
        console.error("Ошибка при генерации PDF:", error);
        alert('Ошибка создания отчёта: '+ error.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <Container>
            <Row className="mt-5">
                <Col md={4} className='d-flex mb-2'>
                    <Button className='py-3 mx-2 w-100' variant="primary" onClick={() => navigate('/usermanagement')} style={{ width: '100%' }}>
                        Управление пользователями
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className='py-3 mx-2 w-100' variant="primary" onClick={() => navigate('/rentmanagement')} style={{ width: '100%' }}>
                        Управление прокатами
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className='py-3 mx-2 w-100' variant="primary" onClick={() => navigate('/raftingmanagement')} style={{ width: '100%' }}>
                        Управление сплавами на байдарках
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={4} className='d-flex mb-2'>
                    <Button className='py-3 mx-2 w-100' variant="success" onClick={handleOrdersReport} style={{ width: '100%' }}>
                        Отчет по заказам на сплавы
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className='py-3 mx-2 w-100' variant="success" onClick={handleBlockedUsersReport} style={{ width: '100%' }} disabled={loading}>
                        Отчет по заблокированным пользователям
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className='py-3 mx-2 w-100' variant="success" onClick={handleRatingsReport} style={{ width: '100%' }}>
                        Отчет по рейтингам сплавов
                    </Button>
                </Col>
            </Row>
        </Container>
    );
});

export default Admin;