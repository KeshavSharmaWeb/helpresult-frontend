import React from 'react'
import { Box, makeStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Boxex from './Boxex';
import Zoom from "react-reveal";


export default function Midsec() {
    const useStyles = makeStyles((theme) => ({
        box: {
            marginTop: "2%",
        },
        upperBox: {
            margin: "10px 80px",
            [theme.breakpoints.down("sm")]: {
                margin: "2px 10px"
            }
        },
        lowerBox: {
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            margin: "20px 70px",
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
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Zoom right>
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
                    <Boxex title="SSC CHSL 10+2 Apply Online" backcolor="#868a08" />
                    <Boxex title="UPSC CDS 1 Apply Online" backcolor="#0404b4" />
                    <Boxex title="UP Sachivalaya Admit Card" backcolor="#fb5e03" />
                    <Boxex title="UPSESSB UP PGT Apply Online" backcolor="#8c0101" />
                    <Boxex title="UP Regional Inspector Apply Online" backcolor="#fb0303" />
                    <Boxex title="UPSESSB UP TGT Apply Online" backcolor="#0b610b" />
                    <Boxex title="UP Scholarship Apply Online" backcolor="#0080ff" />
                    <Boxex title="Bihar Constable 2020 Apply Online" backcolor="#868a08" />
                </Box>
            </Zoom>
        </Box>
    )
}