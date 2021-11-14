import React from 'react'
import {Box,makeStyles} from "@material-ui/core";
import { Link } from 'react-router-dom';
import Boxex from './Boxex';
import Zoom from "react-reveal";

const useStyles = makeStyles( (theme) => ({
    box:{
        marginTop: "5%",
    },
    upperBox: {
        margin: "10px 80px",
        [theme.breakpoints.down("sm")]:{
            margin: "2px 10px"
        }
    },
    lowerBox:{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        margin: "20px 70px",
        columnGap: "8px",
        rowGap: "8px",
        [theme.breakpoints.down('sm')]: {
            margin: "2px 10px",
        },
    },
    lineOne:{
        color: "red",
        fontWeight: 700,
    },
    lineTwo: {
        color: "#0759ad",
        fontWeight: 700,
    },
    lineThree:{
        color: "#f27a05",
        fontWeight: 700,
    }
}))

export default function Midsec() {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
        <Zoom right> 
            <Box className={classes.upperBox}>
                    <marquee behavior="alternate" direction="ltr" align="center">
                    <Box >
                        <Link to="/" className={classes.lineOne}> UP NTSE Online 2020 </Link> || 
                        <Link to="/" className={classes.lineOne}> UP NTSE Online 2020 </Link> ||
                        <Link to="/" className={classes.lineOne}> UP NTSE Online 2020 </Link>
                    </Box>
                    </marquee>
                    <marquee behavior="alternate" direction="ltr" align="center">
                    <Box >
                        <Link to="/" className={classes.lineTwo}> UP NTSE Online 2020 </Link> || 
                        <Link to="/" className={classes.lineTwo}> Allahabad University Online Counseling 2020 </Link> ||
                        <Link to="/" className={classes.lineTwo}> UP NTSE Online 2020 </Link>
                    </Box>
                    </marquee>
                    <marquee behavior="alternate" direction="ltr" align="center">
                    <Box >
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
