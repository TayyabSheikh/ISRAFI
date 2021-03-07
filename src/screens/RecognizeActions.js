import React, { Component } from "react";
import ReactPlayer from "react-player";
//import { useLocation } from "react-router-dom";

class RecognizeActions extends Component {
    //const location = useLocation()
    constructor(props) {
        super(props);
        this.state = {
            title : "None",
            length: "None",
            prediction: "None",
            picture : false,
            videoFilePath: null
        };

    }
    function 
    callAPI() {
        fetch("http://localhost:9000/RecognizeActions")
            .then(res => res.text())
            .then(res => this.setState({ title: res }))
            .then(console.log(this.state.title +   "help"))
            .catch(err => err)
    }

    callotherAPI() {
        fetch("http://localhost:9000/RecognizeActionsCall")
            .then(res => res.text())
            .then(res => this.setState({ prediction: res }))
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
    
    const handleVideoUpload = (event) => {
        this.setState( {videoFilePath : URL.createObjectURL(event.target.files[0])});
        };

    return (
        <div>
            <p>Recognize Actions</p>
            <ul>
                <li>
                    Video Title : {this.state.title}
                </li>
                <li>
                    Video Length : {this.state.length}
                </li>
                <li>
                    Prediction : {this.state.prediction}
                </li>
            </ul>
            <input type="file" onChange={handleVideoUpload} />
            <ReactPlayer url={this.state.videoFilePath} width="100%" height="100%" controls={true} />
            <button onClick = {onPredict}>Predict</button>
        </div>

    );
}

}
    
export default RecognizeActions;