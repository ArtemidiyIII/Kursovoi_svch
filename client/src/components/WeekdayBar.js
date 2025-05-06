import React, { useContext }  from "react";
import { observer } from "mobx-react-lite";
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";

const WeekDayBar = observer(() => {
    const {raftings} = useContext(Context)

    const handleWeekDayClick = (weekday) => {
        if (raftings.selectedWeekday.id === weekday.id) {
            raftings.setSelectedWeekday({}); 
            localStorage.removeItem('selectedWeekDay');
        } 
        else {
            raftings.setSelectedWeekday(weekday);
            localStorage.setItem('selectedWeekDay', JSON.stringify(weekday));
        }
    };

    return (
        <Row className = "d-flex">
            {raftings.weekdays.map((weekday) => (
                <Card
                    style={{
                        cursor: 'pointer',
                        width: 'auto',
                    }}
                    key ={weekday.id}
                    className="p-3 ms-2"
                    onClick = {() => handleWeekDayClick(weekday)}
                    border = {weekday.id === raftings.selectedWeekday.id ? 'danger' : 'light'}
                >
                    {weekday.name}
                </Card>
            ))}
        </Row>
    )
})

export default WeekDayBar;