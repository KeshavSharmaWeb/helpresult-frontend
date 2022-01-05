import React, {useState, useEffect} from 'react'
import { Box, makeStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Boxex from './Boxex';
import axios from 'axios';
import { url } from '../../config';


export default function Midsec() {
    const [records, setRecords] = useState([])
    const [isReady, setIsReady] = useState(false)

    const useStyles = makeStyles((theme) => ({
        box: {
            maxWidth: "1200px",
            margin: "auto",
            marginTop: "2%",
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
        axios.get(`${url}/news-records`).then(res => {
            setRecords(res.data)
            setIsReady(true)
        }
        )
    }, [])
    const classes = useStyles();
    return (
        <Box className={classes.box}>
                <Box className={classes.upperBox}>
                    {/* eslint-disable-next-line */}
                    <marquee behavior="alternate" direction="ltr" align="center" id="marquee-1">
                        <Box onMouseOver={() => document.getElementById('marquee-1').stop()} onMouseOut={() => document.getElementById('marquee-1').start()}>
                            <Link to="/" className={classes.lineOne}> UP NTSE Online 2020 </Link> ||
                            <Link to="/" className={classes.lineOne}> UP NTSE Online 2020 </Link> ||
                            <Link to="/" className={classes.lineOne}> UP NTSE Online 2020 </Link>
                        </Box>
                    </marquee>
                    {/* eslint-disable-next-line */}
                    <marquee behavior="alternate" direction="ltr" align="center" id="marquee-2">
                    <Box onMouseOver={() => document.getElementById('marquee-2').stop()} onMouseOut={() => document.getElementById('marquee-2').start()}>
                            <Link to="/" className={classes.lineTwo}> UP NTSE Online 2020 </Link> ||
                            <Link to="/" className={classes.lineTwo}> Allahabad University Online Counseling 2020 </Link> ||
                            <Link to="/" className={classes.lineTwo}> UP NTSE Online 2020 </Link>
                        </Box>
                    </marquee>
                    {/* eslint-disable-next-line */}
                    <marquee behavior="alternate" direction="ltr" align="center" id="marquee-3">
                        <Box onMouseOver={() => document.getElementById('marquee-3').stop()} onMouseOut={() => document.getElementById('marquee-3').start()}>
                            <Link to="/" className={classes.lineThree}> Allahabad University Online Counseling 2020 </Link> ||
                            <Link to="/" className={classes.lineThree}> Allahabad University Online Counseling 2020 </Link> ||
                            <Link to="/" className={classes.lineThree}> UP NTSE Online 2020 </Link>
                        </Box>
                    </marquee>
                </Box>
                <Box className={classes.lowerBox}>
                    {isReady && records.map((record, index) => {
                            return ( <Boxex record={record} key={index} backcolor={record.fillColor} /> )
                    })}
                    {/* <Boxex title="SSC CHSL 10+2 Apply Online" backcolor="#868a08" /> */}
                </Box>
        </Box>
    )
}