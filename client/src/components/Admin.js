import React , { useEffect,  useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Navbar from './Navbar';
import ForbidenAccess from './403';
import AdminPage from './AdminPage';

const Admin = () => {
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
        
        await axios.post('http://localhost:3000/check-admin-access', body, config)
        .then(response => {
            role = response.data.jwt;
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    }, []);

   return (
        <div>
            <Navbar/>
            {(role == "user") ? ( <AdminPage /> ) : ( <ForbidenAccess /> )}
        </div>
        );
}

export default Admin;