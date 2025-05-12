import React, { useContext, useState, useEffect } from 'react'; 
import { observer } from 'mobx-react-lite';
import { Context } from '../../src/index';
import {  useNavigate } from 'react-router-dom';

const UserProfile = observer(() => {
    const { user } = useContext(Context); 
    const navigate = useNavigate();


    return (
        <div>

        </div>
    )

})

export default UserProfile;