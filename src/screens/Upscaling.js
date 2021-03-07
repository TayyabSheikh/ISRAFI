import React, { Component } from "react";

class Upscaling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : "None",
        };

    }
    callAPI() {
        fetch("http://localhost:9000/Upscale")
            .then(res => res.text())
            .then(res => this.setState({ data: res }))
            .catch(err => err);
    }
    componentDidMount() {
        this.callAPI();
    }
    render(){
        return(
            <div>
            {this.state.data}
            </div>
        )
    }
}

export default Upscaling;