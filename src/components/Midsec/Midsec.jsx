import React, {useState, useEffect} from 'react'
import { Box, makeStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Boxex from './Boxex';
import axios from 'axios';
import { url } from '../../config';


export default function Midsec() {
    const [records, setRecords] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [newsRecords, setNewsRecords] = useState([])

    const useStyles = makeStyles((theme) => ({
        box: {
            maxWidth: "1200px",
            margin: "auto",
            // marginTop: "2%",
            background: "whitesmoke",
        },
        upperBox: {
            margin: "10px 0",
            [theme.breakpoints.down("sm")]: {
                margin: "2px 10px"
            }
        },
        lowerBox: {
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            margin: "20px 0",
            columnGap: "8px",
            rowGap: "8px",
            [theme.breakpoints.down('sm')]: {
                margin: "2px 10px",
            },
        },
        lineOne: {
            color: "red",
            textDecoration: "none",
            fontSize: "medium",
            fontWeight: 700,
            "&:hover" : {
                color: "red",
            }
        },
        lineTwo: {
            color: "#0759ad",
            textDecoration: "none",
            fontSize: "medium",
            fontWeight: 700,
            "&:hover" : {
                color: "#0759ad",
            }
        },
        lineThree: {
            color: "#f27a05",
            textDecoration: "none",
            fontSize: "medium",
            fontWeight: 700,
            "&:hover" : {
                color: "#f27a05",
            }
        }
    }))

    useEffect(() => {
        axios.get(`${url}/news-records?box=yes`).then(res => {
            setRecords(res.data)
        }
        )
        axios.get(`${url}/news-records?box=no`).then(res => {
            setNewsRecords(res.data)
            setIsReady(true)
        }
        )
    }, [])
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            {isReady ? 
                <Box className={classes.upperBox}>
                    {/* eslint-disable-next-line */}
                    <marquee behavior="alternate" direction="ltr" align="center" id="marquee-1">
                        <Box onMouseOver={() => document.getElementById('marquee-1').stop()} onMouseOut={() => document.getElementById('marquee-1').start()}>
                            <Link to={`/details/${newsRecords[0].name}/?id=${newsRecords[0].recordId}`} className={classes.lineOne}> {newsRecords[0].name} </Link> ||
                            <Link to={`/details/${newsRecords[1].name}/?id=${newsRecords[1].recordId}`} className={classes.lineOne}> {newsRecords[1].name} </Link> ||
                            <Link to={`/details/${newsRecords[2].name}/?id=${newsRecords[2].recordId}`} className={classes.lineOne}> {newsRecords[2].name} </Link>
                        </Box>
                    </marquee>
                    {/* eslint-disable-next-line */}
                    <marquee behavior="alternate" direction="ltr" align="center" id="marquee-2">
                    <Box onMouseOver={() => document.getElementById('marquee-2').stop()} onMouseOut={() => document.getElementById('marquee-2').start()}>
                            <Link to={`/details/${newsRecords[3].name}/?id=${newsRecords[3].recordId}`} className={classes.lineTwo}> {newsRecords[3].name} </Link> ||
                            <Link to={`/details/${newsRecords[4].name}/?id=${newsRecords[4].recordId}`} className={classes.lineTwo}> {newsRecords[4].name} </Link> ||
                            <Link to={`/details/${newsRecords[5].name}/?id=${newsRecords[5].recordId}`} className={classes.lineTwo}> {newsRecords[5].name} </Link>
                        </Box>
                    </marquee>
                    {/* eslint-disable-next-line */}
                    <marquee behavior="alternate" direction="ltr" align="center" id="marquee-3">
                        <Box onMouseOver={() => document.getElementById('marquee-3').stop()} onMouseOut={() => document.getElementById('marquee-3').start()}>
                            <Link to={`/details/${newsRecords[6].name}/?id=${newsRecords[6].recordId}`} className={classes.lineThree}> {newsRecords[6].name} </Link> ||
                            <Link to={`/details/${newsRecords[7].name}/?id=${newsRecords[7].recordId}`} className={classes.lineThree}> {newsRecords[7].name} </Link> ||
                            <Link to={`/details/${newsRecords[8].name}/?id=${newsRecords[8].recordId}`} className={classes.lineThree}> {newsRecords[8].name} </Link>
                        </Box>
                    </marquee>
                </Box>
                : null}
                <Box className={classes.lowerBox}>
                    {isReady && records.map((record, index) => {
                            return ( <Boxex record={record} key={index} backcolor={record.fillColor} /> )
                    })}
                    {/* <Boxex title="SSC CHSL 10+2 Apply Online" backcolor="#868a08" /> */}
                </Box>
        </Box>
    )
}