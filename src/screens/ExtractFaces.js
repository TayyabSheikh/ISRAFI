import React, { Component } from "react";
//import { useLocation } from "react-router-dom";

class ExtractFaces extends Component {
    //const location = useLocation()
    constructor(props) {
        super(props);
        this.state = {
            title : "None",
            length: "None",
            response : 'false'
        };

    }
    function 
    callAPI() {
        fetch("http://localhost:9000/ExtractFaces")
            .then(res => res.text())
            .then(res => this.setState({ title: res }))
            .then(console.log(this.state.title +   "help"))
            .catch(err => err)
    }

    callotherAPI() {
        fetch("http://localhost:9000/ExtractFacesCall")
            .then(res => res.text())
            .then(res => this.setState({ response: res }))
            .catch(err => err);
    }
    componentDidMount() {
        this.callAPI();
        let format = this.state.title.substring(this.state.title.lastIndexOf('.'))
        console.log(format + "adg")
        
    }
    
render(){
    const onPredict = e => {
        e.preventDefault()
        console.log('click')
        this.callotherAPI()
    }
    

    return (
        <div>
            <p>Extract Faces</p>
            <ul>
                <li>
                    Video Title : {this.state.title}
                </li>
                <li>
                    Video Length : {this.state.length}
                </li>
                <li>
                    Res Length : {this.state.response}
                </li>
                
            </ul>
            <button onClick = {onPredict}>Extract</button>
        </div>

    );
}

}
    
export default ExtractFaces;