import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RiverBar from '../components/RiverBar';
import WeekDayBar from '../components/WeekdayBar';
import RaftingList from '../components/RaftingsList';
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useLocation, useNavigate } from 'react-router-dom';
import RaftingPageNumber from '../components/RaftingPageNumber'
import { fetchRivers, fetchWeekdays, fetchRaftings } from '../http/raftingAPI';


const RaftingCatalog = observer(() => {
    const { raftings } = useContext(Context);
    const location = useLocation(); 
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const riverFilter = queryParams.get('river'); 
        const weekdayFilter = queryParams.get('weekday');
        if (queryParams.has('river') || queryParams.has('weekday')) {
            navigate('/raftingcatalog');
        }
        
        if (riverFilter) {
            const selectedRiver = raftings.rivers.find(river => river.name === riverFilter);
            if (selectedRiver) {
                raftings.setSelectedRiver(selectedRiver);
                localStorage.setItem('selectedRiver', JSON.stringify(selectedRiver)); 
            }
        } 
        else {          
            const savedRiver = JSON.parse(localStorage.getItem('selectedRiver'));
            if (savedRiver) {
                raftings.setSelectedRiver(savedRiver);
            }
        }
    
      
        if (weekdayFilter) {
            const selectedWeekday = raftings.weekdays.find(weekday => weekday.name === weekdayFilter);
            if (selectedWeekday) {
                raftings.setSelectedWeekday(selectedWeekday);
                localStorage.setItem('selectedWeekday', JSON.stringify(selectedWeekday));
            }
        } 
        else {
            const savedWeekday = JSON.parse(localStorage.getItem('selectedWeekday'));
            if (savedWeekday) {
                raftings.setSelectedWeekday(savedWeekday);
            }
        }
    
        const loadInitialData = async () => {
            try {
                const rivers = await fetchRivers();
                raftings.setRivers(rivers);
    
                const weekdays = await fetchWeekdays();
                raftings.setWeekdays(weekdays);
    
                const fetchedRaftings = await fetchRaftings(
                    raftings.selectedRiver.id || null,
                    raftings.selectedWeekday.id || null,
                    1,
                    raftings.limitRaftings
                );
                raftings.setRaftings(fetchedRaftings.rows);
                raftings.setTotalCountRaftings(fetchedRaftings.count);
            } 
            catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };
    
        loadInitialData();
    }, [raftings, location.search, navigate])
    
    useEffect(() => {
        
        const loadFilteredRaftings = async () => {
            try {
                const fetchedRaftings = await fetchRaftings(
                    raftings.selectedRiver.id || null,
                    raftings.selectedWeekday.id || null,
                    raftings.page,
                    raftings.limitRaftings
                );
                raftings.setRaftings(fetchedRaftings.rows);
                raftings.setTotalCountRaftings(fetchedRaftings.count);
            } 
            catch (error) {
                console.error("Ошибка при загрузке сплавов:", error);
            }
        };
    
        loadFilteredRaftings();
    }, [raftings, raftings.selectedRiver, raftings.selectedWeekday, raftings.page, raftings.limitRaftings]);
      
    const resetFilters = () => {
        raftings.setSelectedRiver({});
        raftings.setSelectedWeekday({});
        raftings.setPage(1);
    
        localStorage.removeItem('selectedRiver');
        localStorage.removeItem('selectedWeekday');
       
    };

    return (
        <Container>
            <Row className="mt-2">
                <Col md = {3}>
                    <RiverBar/>
                </Col>
                <Col md = {9}>
                    <WeekDayBar/>
                    <Button variant="outline-danger" onClick={resetFilters} className="mt-3">
                        Сбросить фильтры
                    </Button>
                    <RaftingList/>
                    <RaftingPageNumber/>
                </Col>
            </Row>
        </Container>
    )
})

export default RaftingCatalog;