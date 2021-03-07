import React, {Component } from "react";
import Main from './screens/Main'
import RecognizeActionScreen from './screens/RecognizeActions'
import ExtractFacesScreen from './screens/ExtractFaces'
import Upscaling from './screens/Upscaling'
import {
    BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

class App extends Component {
    
    render() {
        return (
            <Router>
                <Link to = "/"></Link>
                <Link to ="/RecognizeActions"></Link>
                <Switch>
                    <Route exact path = "/">
                        <Main/>
                    </Route>
                    <Route exact path = "/RecognizeActions">
                        <RecognizeActionScreen/>
                    </Route>
                    <Route exact path = "/Upscale">
                        <Upscaling/>
                    </Route>
                    <Route exact path = "/ExtractFaces">
                        <ExtractFacesScreen/>
                    </Route>
                </Switch>
            </Router>
            
        );
    }
}

export default App;