import React, { useContext, useState, useEffect } from 'react'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import {  useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { USERMANAGEMENT_ROUTE, RAFTINGMANAGEMENT_ROUTE,  RENTMANAGEMENT_ROUTE} from "../utils/consts";
import {fetchUsers} from '../http/userAPI'
import { saveAs } from "file-saver"




const Admin = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

    useEffect(() => {
        async function loadUsers() {
            setLoading(true)
            try {
                const data = await fetchUsers()
                setUsers(data)
            } finally {
                setLoading(false)
            }
        }
    }, [])
    
    function handleSnackbarClose() {
        setSnackbar({ ...snackbar, open: false })
    }
    /*const handleUsersManagement = () => {
        navigate('/usermanagement'); // Перенаправление на страницу управления пользователями
    };

    const handleRentalsManagement = () => {
        // Логика для управления прокатами
        console.log('Управление прокатами');
    };

    const handleRaftingManagement = () => {
        // Логика для управления сплавами на байдарках
        console.log('Управление сплавами на байдарках');
    };*/
    
    const handleOrdersReport = () => {
        // Логика для отчета по заказам на сплавы
        console.log('Отчет по заказам на сплавы');
    };

    async function handleBlockedUsersReport () {
        // Логика для отчета по заблокированным пользователям
        setLoading(true);
        try {
            const data = await fetchUsers();
            const bannedUsers = data.filter(user => user.block);

            if (bannedUsers.length === 0) {
                setSnackbar({ open: true, message: "Нет заблокированных пользователей", severity: "info" });
                return;
            }

            const doc = new jsPDF();
            const header = ["id", "email", "role", "createdAt"];
            const body = bannedUsers.map(user => [user.id, user.email, user.role, user.createdAt]);


            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            autoTable(doc, {
                head: [header],
                body: body,
                startY: 20
            });


            const blob = doc.output('blob');
            saveAs(blob, `banned_users_${new Date().toISOString().slice(0, 10)}.pdf`);

            setSnackbar({ open: true, message: "PDF отчёт создан", severity: "success" });
        } catch (error) {
            console.error("Ошибка при генерации PDF:", error);
            setSnackbar({ open: true, message: "Ошибка создания отчёта: " + error.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleRatingsReport = () => {
        // Логика для отчета по рейтингам сплавов
        console.log('Отчет по рейтингам сплавов');
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col md={4} className='d-flex mb-2'>
                    <Button className = 'py-3 mx-2 w-100' variant="primary" onClick={()=> navigate(USERMANAGEMENT_ROUTE)} style={{ width: '100%' }}>
                        Управление пользователями
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className = 'py-3 mx-2 w-100' variant="primary" onClick={()=> navigate(RENTMANAGEMENT_ROUTE)} style={{ width: '100%' }}>
                        Управление прокатами
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className = 'py-3 mx-2 w-100' variant="primary" onClick={()=> navigate(RAFTINGMANAGEMENT_ROUTE)} style={{ width: '100%' }}>
                        Управление сплавами на байдарках
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={4} className='d-flex mb-2'>
                    <Button className = 'py-3 mx-2 w-100' variant="success" onClick={handleOrdersReport} style={{ width: '100%' }}>
                        Отчет по заказам на сплавы
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className = 'py-3 mx-2 w-100'
                     variant="success" 
                     onClick={handleBlockedUsersReport} 
                     style={{ width: '100%' }}
                     disabled={loading}
                    >
                        Отчет по заблокированным пользователям
                    </Button>
                </Col>
                <Col md={4} className='d-flex mb-2'>
                    <Button className = 'py-3 mx-2 w-100' variant="success" onClick={handleRatingsReport} style={{ width: '100%' }}>
                        Отчет по рейтингам сплавов
                    </Button>
                </Col>
            </Row>
        </Container>
    )
})

export default Admin;