import React, { Component } from "react";
import ParticlesBg from 'particles-bg'
import '../styles/main.css'

import Title from '../components/Title'
import Para from '../components/Para'
import StartButton from "../components/StartButton";
import FileInput from "../components/FileInput";
import CardPanel from '../components/CardPanel'




class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "Server Not Connected",
            test: "black",
            clicked: false,
            selectedComponent: 'none'
        };

    }


    handleCallback = (childData) => {
        this.setState({ clicked: childData })
    }
    callAPI() {
        fetch("http://localhost:9000/")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }


    componentDidMount() {
        this.callAPI();
        if( window.history.length > 2){
            this.setState({
                clicked : true
            })
        }
    }

    render() {
        
        /* let config = {
             num: [4, 7],
             rps: 0.1,
             radius: [5, 40],
             life: [1.5, 3],
             v: [2, 3],
             tha: [-40, 40],
             // body: "./img/icon.png", // Whether to render pictures
             // rotate: [0, 20],
             alpha: [0.6, 0],
             scale: [1, 0.1],
             position: "all", // all or center or {x:1,y:1,width:100,height:100}
             color: ["random", "#ff0000"],
             cross: "cross", // cross or bround
             random: 15,  // or null,
             g: 5,    // gravity
             // f: [2, -1], // force
             onParticleUpdate: (ctx, particle) => {
                 ctx.beginPath();
                 ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
                 ctx.fillStyle = particle.color;
                 ctx.fill();
                 ctx.closePath();
             }
           };*/
        return (
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                <header className="App-header">
                    <Title move={this.state.clicked} />
                    <Para show={this.state.clicked} />
                    <StartButton currstate={this.state.clicked} parentCallback={this.handleCallback} />
                        
                    {!this.state.clicked ? (
                        <div></div>
                    ) :
                        (
                            <div>
                                <div className="container mt-4">
                                
                                    <FileInput></FileInput>
                                </div>
                                <div className="container cardpanel">
                                    <div className = "row">
                                        <div className = "col-sm">
                                            <CardPanel linkto = "Upscale" title = "Upscale Data" disc = "Choose from multiple techniques to the data to your desired scale."></CardPanel> 
                                        </div>
                                        <div className = "col-sm">
                                            <CardPanel linkto = "RecognizeActions" title = "Recognize Actions" disc = "Get a detailed report of all the actions recognized in the data."></CardPanel>
                                        </div>
                                        <div className = "col-sm">
                                            <CardPanel linkto = "ExtractFaces" title = "Extract Faces" disc = "Use Artificial Intelligence to extract Faces from the data."></CardPanel>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </header>



                <ParticlesBg color="#ff0000" type="cobweb" bg={true} />
            </div>

        );
    }
}

export default Main;