import React,{Fragment,useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const {username, email, password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();

        const newUser = {
            email,
            username,
            password
        };
    
        try {
            const config = { headers: { 'Content-Type':'application/json' } };
            const body = JSON.stringify(newUser);
            const res = await axios.post('http://0.0.0.0:3000/register', body, config);
            
            switch (res.data) {
                case 'User Registered':
                    history.push('/login');
                    break;
                case 'User Already Exists':
                    alert("Error: " + res.data);
                    break;    
                default:
                    break;
                }
        } catch(err) {
            console.error(err);
        }
    }

    return <Fragment>
                <form class="box" onSubmit={e => onSubmit(e)}>
                    <h1>Register page</h1>
                    <input type="text" name="email" placeholder="Email" id="email" value={email} onChange={e => onChange(e)} required />
                    <input type="text" name="username" placeholder="Username" id="username" value={username} onChange={e => onChange(e)} required />
                    <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={e => onChange(e)} required />
                    <input type="submit" id="submit" value="Submit"/>
                    <br></br>          
                    <p>You already have an account ? </p>
                    <a href="/login">login page</a>
                </form>
        </Fragment>
}

export default Register;