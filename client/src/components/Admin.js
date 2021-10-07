import React from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

import Navbar from './Navbar';

const Admin = () => {

   const history = useHistory();
   const cookies = new Cookies();

   try {
        React.useEffect( async () => {
            const config = { headers: { 'Content-Type':'application/json' } };
            
            const token = cookies.get('jwt');
            const jwtCookie = { token };

            const body = JSON.stringify(jwtCookie);
            console.log(body);
            const res = await axios.post('http://localhost:3000/verify-jwt', body, config);    
            
            console.log(res.data);
            switch (res.data) {
             case 'fail':
                 history.push('/dashboard');
                 break;
             default:
                // use function jwt.decode to check if the jwt have the role of admin but only if the token is valid
                 var role = jwt.decode(cookies.get('jwt'))
                 alert(role.payload)
                 break;
              }                    
        
        }, []);   
    } catch(err) {
      console.error(err.response.data);
    }
    

   return (
        <div>
            <Navbar/>
            <div>
                <h1>Hello admin</h1>
            </div>
            </div>
        );
    }

export default Admin;