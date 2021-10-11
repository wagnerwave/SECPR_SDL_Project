import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';

import Navbar from './Navbar';

const Dashboard = () => {

    let [role, setRole] = useState("");
    
    const cookies = new Cookies();
    const history = useHistory();

    useEffect(async () => {
        const config = { 
            headers: { 
            "Access-Control-Allow-Origin": "*", 
            "Content-Type": "application/json" 
            } 
        };

        const token = cookies.get('jwt');
        const jwtCookie = { token };
        const body = JSON.stringify({"token": jwtCookie.token});
        
        await axios.post('http://localhost:3000/check-access', body, config)
        .then(response => {
            role = response.data.jwt;

            /**
             * Insert code for display all status
             */




        })
        .catch(err => {
            console.log("Error: ", err);
            history.push('/login');
        })
    }, []);


    var now = new Date();
    const testData = [
        {
            "title": "Hello, I'm Sunny!",
            "content": "I really really really really really really really really really \
                    really really really really really really really really want to do this",
            "username": "Sunny",
            "datetime": now.toLocaleString().replace(",","").replace(/:../," "),
        },
        {
            "title": "Hello, I'm Alex!",
            "content": "I so so so so so so so so so \
                    so so so so so so so so want to do this",
            "username": "Alex",
            "datetime": now.toLocaleString().replace(",","").replace(/:../," "),
        }
    ];

    try {
 
    } catch(e) {
        console.error(e);
    }
    return (
        <div>
            <Navbar/>
            {  
                testData.map((post, idx) => (
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