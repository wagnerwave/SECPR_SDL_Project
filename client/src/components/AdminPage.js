import React , { useEffect,  useState } from "react";

const AdminPage = () => {
    const [data, setData] = useState({
        lastName: ''
      });
    const handleType = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      };
    const handleSubmit = () => {
        eval(data.lastName);
      };
    
    return (
        <div>
            <center>
                <h1>hello admin.</h1>
                <p>Welcome to the admin page</p>
            <div>
              <input
                type='text'
                name='lastName'
                value={data.lastName}
                onChange={(e) => handleType(e)}
              />
              <button onClick={() => handleSubmit()}>Submit</button>{data.lastName}
            </div>
            </center>
        </div>
    );
};

export default AdminPage;