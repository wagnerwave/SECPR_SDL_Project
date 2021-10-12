import React,{Fragment,useState} from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Post = () => {
    const history = useHistory();
    const cookie = new Cookies();

    const testPostData = {
            "title": "Hello, I'm Sunny!",
            "content": "I really really really really really really really really really \
                    really really really really really really really really want to do this",
            "username": "Sunny",
            "datetime": date.now(),
        };
    const {title, content} = formData;

    return (
        <Fragment>
            <div class="box">
                <p id="title">{testPostData.title}</p>
                <hr></hr>
                <p id="username">{testPostData.username}</p>
                <p id="datetime"> | {testPostData.datetime}</p>
                <hr></hr>
                <p id="content">{testPostData.content}</p>
            </div>
        </Fragment>
    );
};

export default Post;