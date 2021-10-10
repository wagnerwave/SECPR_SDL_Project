import React,{Fragment,useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from "jsonwebtoken";

const Write = () => {
    const SecretToken = "YXJtYW5kb2JvbmQ=";
    const history = useHistory();
    const cookie = new Cookies();

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const {title, content} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();

        const Post = {
            title,
            content
        };
    
        try {
            const config = { headers: { 'Content-Type':'application/json' } };
            const body = JSON.stringify(Post);
            const res = await axios.post('http://localhost:3000/login', body, config);
            
            switch (res.data) {
                case 'ok':
                    let accessToken = jwt.sign({"title": Post.title, "role": "user"}, SecretToken, {algorithm: "HS256", expiresIn: 120});
                    cookie.set('jwt', accessToken, { path: '/' });
                    history.push('/dashboard');
                    break;
                case 'fail':
                    alert("Error: No account matches.");
                    break;
                default:
                    break;
            }
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div class="box">
                <form onSubmit={e => onSubmit(e)}>
                    <h1>Share Your Idea!</h1>
                    <input type="text" name="title" placeholder="Title" id="title" value={title} onChange={e => onChange(e)}required/>
                    <input type="text" name="content" placeholder="Content" id="content" value={content} onChange={e => onChange(e)} required/>
                    <input type="submit" id="submit" value="Submit" />
                    {/* <p>You don't have an account ? </p> */}
                </form>
                <hr></hr>
            </div>
        </Fragment>
    );
};

export default Write;