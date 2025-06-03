import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import CreateRiver from '../components/modals/CreateRiver';
import CreateWeekday from '../components/modals/CreateWeekday';
import CreateRafting from '../components/modals/CreateRafting';
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import { fetchRivers, fetchWeekdays, fetchRaftings, deleteRiver, deleteWeekday, deleteRafting } from '../http/raftingAPI';
import { Dropdown, Row, Col, ListGroup } from 'react-bootstrap';

const RaftingManagement = observer(() => {
    const { raftings } = useContext(Context);
    const [weekdayVisiable, setWeekdayVisiable] = useState(false);
    const [riverVisiable, setRiverVisiable] = useState(false);
    const [raftingVisiable, setRaftingsVisiable] = useState(false);
    const [editingRiver, setEditingRiver] = useState(null);
    const [editingWeekday, setEditingWeekday] = useState(null);
    const [editingRafting, setEditingRaftings] = useState(null);
    useEffect(() => {
        fetchRivers().then(data => raftings.setRivers(data));
        fetchWeekdays().then(data =>{raftings.setWeekdays((data))});
        fetchRaftings().then(data => {
        raftings.setRaftings(data.rows); 
        });
    }, [raftings]);

    const handleDeleteRiver = async (id) => {
        try {
        await deleteRiver(id);
        alert('Река успешно удалена!');
        fetchRivers().then(data => raftings.setRivers(data));
        } catch (error) {
        alert('Не удалось удалить реку: ' + error.response?.data?.message || error.message);
        }
    };

    const handleDeleteWeekday = async (id) => {
        try {
        await deleteWeekday(id);
        alert('День проведения сплава успешно удален!');
        fetchWeekdays().then(data => raftings.setWeekdays(data));
        } catch (error) {
        alert('Не удалось удалить день проведения сплава: ' + error.response?.data?.message || error.message);
        }
    };

    const handleDeleteRaftings = async (id) => {
        try {
        await deleteRafting(id);
        alert('Сплав на байдарках успешно удален!');
        fetchRaftings().then(data => raftings.setRaftings(data));
        } catch (error) {
        alert('Не удалось удалить сплав на байдарках: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <Container className='d-flex flex-column'>
        <Row md={5}>
            <Col>
            <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingRiver(null); setRiverVisiable(true); }}>
                Добавить реку
            </Button>
            </Col>
            <Col>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{raftings.selectedRiver?.name || "Выберите реку для изменения"}</Dropdown.Toggle>
                <Dropdown.Menu>
                {raftings.rivers.map(river =>
                    <Dropdown.Item
                    key={river.id}
                    onClick={() => {
                        raftings.setSelectedRiver(river);
                        setEditingRiver(river); 
                        setRiverVisiable(true);
                    }}
                    >
                    {river.name}
                    <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRiver(river.id);
                        }}
                    >
                        Удалить
                    </Button>
                    </Dropdown.Item>
                )}
                </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>

        <Row md={5}>
            <Col>
            <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingWeekday(null); setWeekdayVisiable(true); }}>
                Добавить день проведения сплавов
            </Button>
            </Col>
            <Col>
            <Dropdown className='mt-2'>
                <Dropdown.Toggle>{raftings.selectedWeekday?.name || "Выберите день проведения сплавов для изменения"}</Dropdown.Toggle>
                <Dropdown.Menu>
                {raftings.weekdays.map(weekday =>
                    <Dropdown.Item
                    key={weekday.id}
                    onClick={() => {
                        raftings.setSelectedWeekday(weekday);
                        setEditingWeekday(weekday); 
                        setWeekdayVisiable(true);
                    }}
                    >
                    {weekday.name}
                    <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWeekday(weekday.id);
                        }}
                    >
                        Удалить
                    </Button>
                    </Dropdown.Item>
                )}
                </Dropdown.Menu>
            </Dropdown>
            </Col>
        </Row>

        <Button variant='outline-dark' className='mt-2 p-2' onClick={() => { setEditingRaftings(null); setRaftingsVisiable(true); }}>
            Добавить сплав на байдарках
        </Button>

        <h4 className='mt-4'>Сплавы на байдарках, которые вы можете удалить</h4>
        
        <ListGroup>
            {Array.isArray(raftings.raftings) && raftings.raftings.map(rafting => (
                <ListGroup.Item key={rafting.id} className="d-flex justify-content-between align-items-center">
                    {rafting.name}
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteRaftings(rafting.id)}
                    >
                        Удалить
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>

        <CreateRiver
            show={riverVisiable}
            onHide={() => { setEditingRiver(null); setRiverVisiable(false); }}
            editingItem={editingRiver}
        />
        <CreateWeekday
            show={weekdayVisiable}
            onHide={() => { setEditingWeekday(null); setWeekdayVisiable(false); }}
            editingItem={editingWeekday}
        />
        <CreateRafting
            show={raftingVisiable}
            onHide={() => { setEditingRaftings(null); setRaftingsVisiable(false); }}
            editingItem={editingRafting}
        />      <hr style={{opacity: 0}}></hr><hr style={{opacity: 0}}></hr><hr></hr>
        <div style={{opacity: 0}}>
        <hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr></div>
        
        </Container>
    );
});

export default RaftingManagement;