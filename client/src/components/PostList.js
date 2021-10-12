import React, {useEffect, useState, setState } from "react";
import { useHistory, Link }               from 'react-router-dom';
import { Card, Row, Col }                     from 'react-bootstrap';
import axios                        from "axios";
import Cookies                      from 'universal-cookie';

import Navbar                       from './Navbar';

const PostList = () => { 
    
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


    const [postData, setPostData] = useState([]);
    
    useEffect(async() => {
           await axios.get('http://localhost:3000/posts/get-all', body, config)
            .then(response => {
                setPostData(response.data);
            })
            .catch(err => {
                console.error("Error:", err);
            })
    }, []);

    function clickPost(postId) {
        console.log(postId)
        // return(
        //     // <Link to={"/"+postId}/>
        // )
    }
    console.log(postData)
    return (  
        <div id="post-div">
            <Row xs={1} md={2} className="g-4">
                { postData.map((post) => (
                    <Col style={{display: 'flex', justifyContent: 'center'}}>
                        <Card
                            key={postData._id}
                            style={{ width: '18rem', border: '4px solid #7597de !important' }}
                            className="mb-2"
                        >
                            <Card.Header>{post.username}</Card.Header>
                            <Card.Body>
                            <Card.Title>{post.Title}</Card.Title>
                            <Card.Text>{post.Content}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{Date(post.datetime * 1000).toLocaleString().replace(",","").replace(/:../," ")}</small>
                            </Card.Footer>
                        </Card>
                </Col>
                ))}
            </Row>
        </div>
    );
};

export default PostList;