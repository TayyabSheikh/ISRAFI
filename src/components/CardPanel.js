import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Link } from '@material-ui/core';
import { getDefaultNormalizer } from '@testing-library/react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 200,
        paddingTop: 10,
        opacity: '85%',
        borderColor: 'grey'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        opacity: '100%'
    },
    title: {
        fontSize: 14,
        opacity: '100%'
    },
    pos: {
        marginBottom: 12,
        opacity: '100%'
    },
});





export default function OutlinedCard(props) {
    const history = useHistory()
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [getresponse, setresponse] = useState('no response')
    //setTitle(props.title)

    async function callAPI() {
        await fetch("http://localhost:9000/upscale")
            .then(res => res.text())
            .then(res => { setresponse(res) })
            .catch(err => err);
    }
    const onClick = e => {
        e.preventDefault()
        console.log('click')
        callAPI()
        history.push({
            pathname : '/test',
            state: {detail : 1}
        })


    }
    return (
        <CardActionArea>
            {useEffect(() => {
                console.log(getresponse)
            })}
            <Card onClick={onClick} className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">

                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.disc}
                        <br />

                    </Typography>
                </CardContent>

            </Card>
        </CardActionArea>

    );
}
