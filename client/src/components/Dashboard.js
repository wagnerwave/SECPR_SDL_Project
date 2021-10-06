import React from "react";
import { useHistory } from 'react-router-dom';
import jwt from "jsonwebtoken";

import Navbar from './Navbar';

const Dashboard = () => {
    const history = useHistory();

    try {
 
    } catch(e) {
        console.error(e);
    }
    return (
        <div>
            <Navbar/>
        </div>
    );
};

export default Dashboard;