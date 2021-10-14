import React, {Fragment,useState} from 'react';
import axios                      from 'axios';
import { useHistory }             from 'react-router-dom';
import Cookies                    from 'universal-cookie';

const Login = () => {
    const history = useHistory();
    const cookie = new Cookies();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();

        const User = {
            username,
            password
        };
    
        const config = { headers: { 'Content-Type':'application/json' } };
        const body = JSON.stringify(User);
        const res = await axios.post('http://0.0.0.0:3000/login', body, config);
        
        const jwtoken = res.data;
        if (jwtoken) {
            cookie.set('jwt', jwtoken, { path: '/' });
            history.push('/dashboard');
        } else {
            alert("Error: No account matches.");
        }
    }

    return (
        <Fragment>
            <div class="box">
                <form onSubmit={e => onSubmit(e)}>
                    <h1>Login page</h1>
                    <input type="text" name="username" placeholder="Username" id="username" value={username} onChange={e => onChange(e)} required/>
                    <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={e => onChange(e)} required/>
                    <input type="submit" id="submit" value="Submit" />
                    <p>You don't have an account ? </p>
                    <a href="/Register">Register page</a>
                </form>
                <hr></hr>
            </div>
        </Fragment>
    );
};

export default Login;