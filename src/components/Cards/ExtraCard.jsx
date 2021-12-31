import React from 'react'
import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import { CheckBox } from "@material-ui/icons"
import Bounce from "react-reveal";

const useStyles = makeStyles((theme) => ({
    mainbox: {
        gridColumnStart: "1",
        gridColumnEnd: "3",  
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "grid",
            gridTemplateColumns: "auto auto",
            marginBottom: "30px"
        },
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "10px 20px"
        },
    },
    box: {
        margin: "2% 2% 0% 0%",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridColumnGap: "35px",
        gridRowGap: "15px",
        [theme.breakpoints.down('sm')]: {
            display: "grid",
            gridTemplateColumns: "auto auto",
        },
        [theme.breakpoints.down('xs')]: {
            display: "flex",
            flexDirection: "column",
        }
    },
    childBox: {
        height: "100%",
        padding: "10px",
        background: "white",
        width: "100%",
        // minWidth: "370px",
        "&:hover": {
            background: "#e3e8e5",
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%", 
            margin: "0px 45px"
        },
        [theme.breakpoints.down('xs')]: {
            width: "90%", 
            margin: "0px 15px"
        }
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
    button: {
        background: "#e87e04",
        fontSize: "13px",
        margin: "20px 20px",
        "&:hover": {
            background: "#e87e04",
        }
    },
    links: {
        color: "white",
        textDecoration: "none",
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
        <Bounce left>
            <Box className={classes.box}>
                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Answer Key </Typography>
                    {
                        (records['61c7fcd58b071fa93f00747d']).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}>
                                    <NavLink to={{ pathname: "/details/" + val.slug, search: `?id=${val._id}` }} className={classes.navLink} >
                                        <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                        {val.post_display_name}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                    <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" className={classes.button}> <Link to="/" className={classes.links} > Read More </Link> </Button>
                    </Box>
                </Box>

                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Syllabus </Typography>
                    {
                        (records['61c7fcdd8b071fa93f00747f']).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}>
                                    <NavLink to={{ pathname: "/details/" + val.slug, search: `?id=${val._id}` }} className={classes.navLink} >
                                        <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                        {val.post_display_name}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                    <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" className={classes.button}> <Link to="/" className={classes.links} > Read More </Link> </Button>
                    </Box>
                </Box>
                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Important </Typography>
                    {
                        (records['61c7fce38b071fa93f007481']).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}>
                                    <NavLink to={{ pathname: "/details/" + val.slug, search: `?id=${val._id}` }} className={classes.navLink} >
                                        <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                        {val.post_display_name}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                    <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" className={classes.button}> <Link to="/" className={classes.links} > Read More </Link> </Button>
                    </Box>
                </Box>

                <Box className={classes.childBox}>
                    <Typography className={classes.heading}> Certificate Verification </Typography>
                    {
                        (records['61c7fce58b071fa93f007483']).map((val, id) => {
                            return (
                                <li key={id} className={classes.li}>
                                    <NavLink to={{ pathname: "/details/" + val.slug, search: `?id=${val._id}` }} className={classes.navLink} >
                                        <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                        {val.post_display_name}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                    <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" className={classes.button}> <Link to="/" className={classes.links} > Read More </Link> </Button>
                    </Box>
                </Box>
            </Box>
        </Bounce>
        </Box>
    )
}
