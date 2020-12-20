import React, { Fragment, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import '../styles/main.css'
import axios from 'axios';

export default function FileInput(props1) {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [error, setError] = useState(false)


  const onChange = e => {
    setFile(e.target.files[0]) //Can be changed to adjust for multiple files
    setFileName(e.target.files[0].name)


  }
  const onClick = e => {
    if (fileName == "Choose File") {
      console.log("error")
      setError(true)
    }
    else {
      setError(false)
      console.log(fileName)
      const data = new FormData()
      data.append('file', file)
      axios.post("http://localhost:9000/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
        .then(res => { // then print response status
          console.log(res.statusText)
        })
    }
  }
  const onSubmit = e => {
    e.preventDefault()
    console.log('yes')
  }
  const props = useSpring({ opacity: 1, delay: 0, from: { opacity: 0 } })
  
  return (
    
    <animated.div style={props}>
      
      <Fragment >
        <form onSubmit={onSubmit}>
          <div className="input-group">
            
            
            <input 
            style = {{
              borderWidth : 1,
              borderColor : error ?  'red' : 'gray'
            }}
            type="file" className="form-control" onChange={onChange} accept=".jpeg" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
            <button style = {{
              backgroundColor : error ? 'red' : 'transparent',
              color : error ? 'white' : 'black'
            }} className="btn btn-outline-secondary" onClick={onClick} type="button" id="inputGroupFileAddon04">Upload</button>
          </div>
        </form>


      </Fragment>

    </animated.div>)
}