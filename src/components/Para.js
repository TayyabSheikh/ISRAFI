import React from 'react';
import {useSpring, animated} from 'react-spring'

export default function Para(props1){

    const props = useSpring({opacity: !props1.show ?  1 : 0, delay: 0, from: {opacity: 0}})
    return (<animated.div style={props}>
        <p className="Para"><b>ISRAFI is an AI based image super resolution algorithm, aimed to enhance low resolution images.</b></p>
        </animated.div>)
}