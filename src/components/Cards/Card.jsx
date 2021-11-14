import React from 'react';
import { Box, Button, makeStyles} from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import Data from "./data.json";
import Bounce from "react-reveal";
import {Link,NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "10px",
        "&:hover":{
            background: "#e3e8e5"
        }
    },
    top: {
        fontSize: "30px",
        textAlign: "center",
        background: "#014e92;",
        color: "white",
        padding: "3px 0px",
        fontWeight: "800"
    },
    mid: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: "5px 10px",
    },
    button: {
        background: "#e87e04",
        fontSize: "13px",
        margin: "20px 20px",
        "&:hover": {
            background: "#e87e04",
        }
    },
    li: {
        listStyle: "none",
        fontWeight: "400",
        width: "100%",
        margin: "4px 0px",
        fontSize: "14px",
        "&:hover":{
            fontWeight: "900",
            cursor: "pointer"
        }
    },
    links: {
        color: "white",
        textDecoration: "none",
    },
    navLink: {
        textDecoration: "none",
        color: "#727272",
        "&:hover":{
            color: "black"
        }
    }
})
);

export default function Card({ title,path }) {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Bounce left>
                <Box className={classes.top}>
                    {title}
                </Box>
                <Box className={classes.mid}>
                    {
                        Data.map((val, id) => {
                            return (
                                <li key={id} className={classes.li}> 
                                    <NavLink to={{pathname: "/full", search: `?name=${val.data}`}} className={classes.navLink} >
                                    <CheckBox  style={{ background: "#0868fe", color: "white",fontSize: "15px", marginRight: "5px" }} />
                                    {val.data}
                                    </NavLink>
                                </li>
                                )
                        })
                    }
                </Box>
                <Box style={{ textAlign: "end" }}>
                    <Button variant="contained" className={classes.button}> <Link to={path} className={classes.links} > Read More </Link> </Button>
                </Box>
            </Bounce>
        </Box>
    )
}