import React, {Component } from "react";
import Main from './screens/Main'
import Test from './screens/Working'
import {
    BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

class App extends Component {
    
    render() {
        return (
            <Router>
                <Link to = "/"></Link>
                <Link to ="/test"></Link>
                <Switch>
                    <Route exact path = "/">
                        <Main/>
                    </Route>
                    <Route exact path = "/test">
                        <Test/>
                    </Route>
                </Switch>
            </Router>
            
        );
    }
}

export default App;