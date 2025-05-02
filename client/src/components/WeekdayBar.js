import React, { useContext }  from "react";
import {observer} from "mobx-react-lite";
import {Context} from '..';

const WeekDayBar = observer(() => {
    const {raftings} = useContext(Context)
    return (
        <div>

        </div>
    )
})

export default WeekDayBar;