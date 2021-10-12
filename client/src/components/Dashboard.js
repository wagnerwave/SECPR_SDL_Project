import React, {useEffect, useState} from "react";
import { useHistory }               from 'react-router-dom';
import { Card }                     from 'react-bootstrap';
import axios                        from "axios";
import Cookies                      from 'universal-cookie';

import Navbar                       from './Navbar';
import Write                        from "./Write";

const Dashboard = () => {  
    var postData = useState([]);

    useEffect(async() => {
            const cookies = new Cookies();
            const history = useHistory();
            
            const config = { 
                headers: { 
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json" 
                } 
            };
            const token = cookies.get('jwt');
            const jwtCookie = { token };
            const body = JSON.stringify({"token": jwtCookie.token});

           await axios.get('http://localhost:3000/posts/get-all', body, config)
            .then(response => {
                postData = response.data;
            })
            .catch(err => {
                console.error("Error:", err);
            })
    }, []);

    return (
        <div>
            <Navbar/>
            <Write />
            {  
                postData.map((post, idx) => (
                    <Card
                        bg={'info'}
                        key={idx}
                        text={'info' === 'light' ? 'dark' : 'white'}
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{post.username}</Card.Header>
                        <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">{post.datetime}</small>
                        </Card.Footer>
                    </Card>
                ))
            };
        </div>
    );
};

export default Dashboard;