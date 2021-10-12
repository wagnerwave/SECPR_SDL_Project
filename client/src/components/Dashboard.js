import React, {useEffect, useState, setState } from "react";
import { useHistory, Link }               from 'react-router-dom';
import { Card, Row, Col }                     from 'react-bootstrap';
import axios                        from "axios";
import Cookies                      from 'universal-cookie';

import Navbar                       from './Navbar';
import PostList                       from './PostList';

const Dashboard = () => { 
    return (  
        <div>
            <Navbar/>

            <div className="write-btn">
                <a href="/Write">Share Your Idea</a>
            </div>

            <PostList/>
        </div>
    );
};

export default Dashboard;