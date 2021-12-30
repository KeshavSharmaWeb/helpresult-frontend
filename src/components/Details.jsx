import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import Flip from "react-reveal";
import axios from 'axios';
import { url } from '../config';
import parse from 'html-react-parser';
import "../App.css"



export default function Details() {
    const useStyles = makeStyles((theme) => ({
        box: {
            display: "flex",
            flexDirection: "column",
            margin: "5% 16% 5% 9%",
            [theme.breakpoints.down("sm")]: {
                margin: "5% 6%"
            }
        },
        row: {
            display: "flex",
            margin: "10px 0px",
            flexDirection: "column"
        },
        title: {
            color: "#ff0033",
            width: "20%",
            display: "flex",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
                marginRight: "5%"
            }
        },
        desc: {
            width: "100%",
            fontSize: "medium",
            [theme.breakpoints.down("sm")]: {
                width: "80%"
            }
        }
    })
    )
    const query = new URLSearchParams(window.location.search)
    const id = query.get('id')

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        axios.get(url + "/records?_id=" + id).then(res => {
            setData(res.data[0]);
            setReady(true);
            document.title = res.data[0].name;
        }
        )
    }, [id])

    return (
        <Flip right>
            {ready ?
            <Box className={classes.box}>
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Name of Post :
                    </Box>
                    <Box className={classes.desc}>
                        <Typography style={{ fontSize: "medium" }}>{data.name}</Typography>
                    </Box>
                </Box>
                {
                    data.updated_at ? 
                    <Box className={classes.row}>
                    <Box className={classes.title}>
                        Post Update:
                    </Box>
                    <Box className={classes.desc}>
                        {data.updated_at}
                    </Box>
                </Box>
                : ''}
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Short Information:
                    </Box>
                    <Box className={classes.desc}>
                        {data.short_information}
                    </Box>
                </Box>
                <Box className={classes.row} >
                    {parse(data.more_data_html)}
                </Box>
            </Box>
            : ''}

        </Flip>
    )
}
