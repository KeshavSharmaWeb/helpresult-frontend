import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {CheckBox} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    box: {
        margin: "2% 0%",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridColumnGap: "40px",
        gridRowGap: "15px",        
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            flexDirection: "column",
            margin: "5px 15px"
        },
        [theme.breakpoints.down('xs')]: {
            display: "flex",
            flexDirection: "column"
        }
    },
    childBox: {
        height: "300px",
        padding: "10px",
        background: "white",
        "&:hover": {
            background: "#e3e8e5",            
        },
    },
    extendedRight: {
        gridRowStart: "1",
        gridRowEnd: "3",
        gridColumnStart: "3",
        padding: "10px",
        background: "white",
        [theme.breakpoints.down('sm')]: {
            height: "300px"
        },
        "&:hover": {
            background: "#e3e8e5",            
        },
    },
    extendedLeft: {
        gridRowStart: "1",
        gridRowEnd: "3",
        gridColumnStart: "1",
        padding: "10px",
        background: "white",
        [theme.breakpoints.down('sm')]: {
            height: "300px"
        },
        "&:hover": {
            background: "#e3e8e5",            
        },
    },
    li: {
        listStyle: "none",
        fontWeight: "400",
        width: "100%",
        margin: "4px 0px",
        fontSize: "14px",
        "&:hover": {
            fontWeight: "900",
            cursor: "pointer"
        }
    },
    navLink: {
        textDecoration: "none",
        color: "#727272",
        "&:hover": {
            color: "black"
        }
    },
    heading: {
        fontSize: "30px",
        textAlign: "center",
        background: "#014e92;",
        color: "white",
        padding: "3px 0px",
        fontWeight: "800"
    }
}))

export default function ExtraCard({ alternate }) {
    const classes = useStyles();
    return (
        <Box>
            {
                alternate ? <Box className={classes.box}>

                    <Box className={classes.childBox}>
                        <Typography className={classes.heading}> Answer Key </Typography>
                           {/* dummy data */}
                        <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                    </Box>

                    <Box className={classes.childBox}>
                        <Typography className={classes.heading}> Syllabus </Typography>
                        <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                    </Box>

                    <Box className={classes.extendedRight} >
                        <Typography className={classes.heading}> Admission </Typography>
                        <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                Link Here
                                </NavLink>
                            </li>
                    </Box>

                    <Box className={classes.childBox}>
                        <Typography className={classes.heading}> Important </Typography>
                        <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                    </Box>

                    <Box className={classes.childBox}>
                        <Typography className={classes.heading}> Certificate Verification </Typography>
                        <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                    </Box>
                </Box>
                    :
                    <Box className={classes.box}>

                        <Box className={classes.extendedLeft}>
                            <Typography className={classes.heading}> Heading </Typography>
                            <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                        </Box>

                        <Box className={classes.childBox}>
                            <Typography className={classes.heading}> Heading </Typography>
                            <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                        </Box>

                        <Box className={classes.childBox} >
                            <Typography className={classes.heading}> Heading </Typography>
                            <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                        </Box>

                        <Box className={classes.childBox}>
                            <Typography className={classes.heading} > Heading </Typography>
                            <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                        </Box>

                        <Box className={classes.childBox}>
                            <Typography className={classes.heading}> Heading </Typography>
                            <li className={classes.li} >
                                <NavLink to="/" className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    Link Here
                                </NavLink>
                            </li>
                        </Box>
                    </Box>
            }
        </Box>

    )
}
