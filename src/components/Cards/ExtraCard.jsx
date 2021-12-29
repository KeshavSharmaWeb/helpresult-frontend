import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { CheckBox } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    mainbox: {
        gridColumnStart: "1",
        gridColumnEnd: "3",
        marginright: "1%",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column"
        },
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
        }
    },
    box: {
        margin: "2% 2% 0% 0%",
        display: "grid",
        gridTemplateColumns: "auto auto ",
        gridColumnGap: "40px",
        gridRowGap: "15px",
        "&>*":{
            width: "370px"
        },
        [theme.breakpoints.down('sm')]: {
            display: "flex",
            flexDirection: "column",
            margin: "5px 15px",
            "&>*":{
                width: "250px"
            },
        },
        [theme.breakpoints.down('xs')]: {
            display: "flex",
            flexDirection: "column",
            "&>*":{
                width: "250px"
            },
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

export default function ExtraCard({ records }) {
    const classes = useStyles();
    return (
        <Box className={classes.mainbox}>
            <Box className={classes.box}>
                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Answer Key </Typography>
                    {
                        records.filter(record => record.categoryIds.includes("61c7fcd58b071fa93f00747d")).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}> 
                                    <NavLink to={{pathname: "/details/"+val.name, search: `?id=${val._id}`}} className={classes.navLink} >
                                    <CheckBox  style={{ background: "#0868fe", color: "white",fontSize: "15px", marginRight: "5px" }} />
                                    {val.name}
                                    </NavLink>
                                </li>
                                )
                        })
                    }
                </Box>

                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Syllabus </Typography>
                    {
                        records.filter(record => record.categoryIds.includes("61c7fcdd8b071fa93f00747f")).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}> 
                                    <NavLink to={{pathname: "/details/"+val.name, search: `?id=${val._id}`}} className={classes.navLink} >
                                    <CheckBox  style={{ background: "#0868fe", color: "white",fontSize: "15px", marginRight: "5px" }} />
                                    {val.name}
                                    </NavLink>
                                </li>
                                )
                        })
                    }
                </Box>
                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Important </Typography>
                    {
                        records.filter(record => record.categoryIds.includes("61c7fce38b071fa93f007481")).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}> 
                                    <NavLink to={{pathname: "/details/"+val.name, search: `?id=${val._id}`}} className={classes.navLink} >
                                    <CheckBox  style={{ background: "#0868fe", color: "white",fontSize: "15px", marginRight: "5px" }} />
                                    {val.name}
                                    </NavLink>
                                </li>
                                )
                        })
                    }
                </Box>

                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Certificate Verification </Typography>
                    {
                        records.filter(record => record.categoryIds.includes("61c7fce58b071fa93f007483")).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}> 
                                    <NavLink to={{pathname: "/details/"+val.name, search: `?id=${val._id}`}} className={classes.navLink} >
                                    <CheckBox  style={{ background: "#0868fe", color: "white",fontSize: "15px", marginRight: "5px" }} />
                                    {val.name}
                                    </NavLink>
                                </li>
                                )
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}
