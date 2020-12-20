import React from 'react';
import {useSpring, animated} from 'react-spring'

export default function Title(props1){
    
    
    var props = useSpring({opacity: 1, delay: 0, margin: props1.move ? -100 : 0 , from: {opacity: 0, margin: 0}})
    
    
    return (<animated.div style={props}>
        <h1 className = "App-title">
            ISRAFI
        </h1>
        </animated.div>)
}