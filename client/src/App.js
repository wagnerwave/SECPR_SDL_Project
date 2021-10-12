import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// CSS PAGES
import './App.css';

// IMPORT PAGES FOR THE ROUTER
import Register from './components/Register';
import NotFoundPage from './components/404';
import ForbidenAccess from './components/403';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Write from './components/Write';
import Post from './components/Post';

class App extends React.Component {
    render() {
        return ( 
            <Router>
                <Switch>
                    <Route exact path="/" component={Register} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/write" component={Write} />
                    <Route exact path="/post" component={Post} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/404" component={NotFoundPage} />
                    <Route exact path="/403" component={ForbidenAccess} />
                    <Redirect to="404" />
                </Switch>
            </Router>
        );
    }
}

export default App;