import React from 'react';
import {useSpring, animated} from 'react-spring'
import { Button } from "@material-ui/core";

export default function StartButton(props1){
    
    const props = useSpring({opacity: !props1.currstate ? 1 : 0, delay: 0, from: {opacity: 0}})
    let onTrigger = (event) =>{
        props1.parentCallback(!props1.currstate)
        event.preventDefault()
    }
    return (<animated.div style={props}>
        <Button onClick = {onTrigger} variant="outlined" disabled = { props1.currstate ? true : false}><b>START</b></Button>
        </animated.div>)
}