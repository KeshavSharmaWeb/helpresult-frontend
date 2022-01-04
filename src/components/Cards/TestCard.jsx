import React from 'react';
import { Box, Button, makeStyles } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "10px",
        height: "100%",
        minHeight: "700px",
        width: "100%",
        "&:hover": {
            background: "#e3e8e5",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            margin: "5px 30px"
        },
        [theme.breakpoints.down("xs")]: {
            width: "90%",
            margin: "5px 30px"
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
        "&:hover": {
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
        "&:hover": {
            color: "black"
        }
    },
    extendCol: {
        gridRowStart: "1",
        gridRowEnd: "4",
        gridColumnStart: "3",
        gridColumnEnd: "4",
        "&>*": {
            height: "100%",
            minHeight: "1100px"
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "98%",
            margin: "2% 2px",
            marginBottom: "5%",
            "&>*": {
                minHeight: "700px"
            },
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
            height: "100%",
            marginBottom: "10px",
        }
    },
    side:{
        width: "100%",
        "&>*":{
            minHeight: "400px"
        }
    }
})
);

export default function Card({ title, records, extend ,side, categoryId }) {
    const classes = useStyles();
    return (
        <Box className={extend ? classes.extendCol : ""}>
        {
            side ? <Box className={classes.side}>
            <Box className={classes.box}>
                    <Box className={classes.top}>
                        {title}
                    </Box>
                    <Box className={classes.mid}>
                        {
                            records.map((val, id) => {
                                return (
                                    <li key={id} className={classes.li}>
                                        <a href={`/details/${val.slug}?id=${val._id}`} rel="noreferrer" className={classes.navLink} target={"_blank"}>
                                            <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                            {val.post_display_name}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </Box>
                    <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" className={classes.button}> <Link to={`/more/posts/?id=${categoryId}`} className={classes.links} > Read More </Link> </Button>
                    </Box>
            </Box>
            </Box> : <Box className={classes.box}>
                    <Box className={classes.top}>
                        {title}
                    </Box>
                    <Box className={classes.mid}>
                        {
                            records.map((val, id) => {
                                return (
                                    <li key={id} className={classes.li}>
                                        <a href={`/details/${val.slug}?id=${val._id}`} rel="noreferrer" className={classes.navLink} target={"_blank"}>
                                            <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                            {val.post_display_name}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </Box>
                    <Box style={{ textAlign: "end" }}>
                        <Button variant="contained" className={classes.button}> <Link to={`/more/posts/?id=${categoryId}`} className={classes.links} > Read More </Link> </Button>
                    </Box>

            </Box>
        }
        </Box>
    )
}
