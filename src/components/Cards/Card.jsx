import React from 'react';
import { Box, Button, makeStyles } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "10px",
        height: "700px",
        width: "370px",
        border: "2px solid red",
        "&:hover": {
            background: "#e3e8e5",            
        },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            margin: "5px 10px",
        },
        [theme.breakpoints.down("xs")]: {
            width: "90%",
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
    }
})
);

export default function Card({ title, slug, categoryId, recordData }) {
    const classes = useStyles();
    const [ready, setReady] = React.useState(false);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        setData(recordData);
        setReady(true);
    }, [recordData]);
    return (
        <Box className={classes.box}>
                <Box className={classes.top}>
                    {title}
                </Box>

                <Box className={classes.mid}>
                    {ready ?

                    data.map((val) => {
                        return (
                            <li className={classes.li} key={val._id}>
                                <NavLink to={`/details/${val.slug}?id=${val._id}`} className={classes.navLink} >
                                    <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    {val.name}
                                </NavLink>
                            </li>
                        )
                    })
                    
                    : ''}

                </Box>
                <Box style={{ textAlign: "end" }}>
                    <Button variant="contained" className={classes.button}> <Link to={`/more/${slug}?id=${categoryId}`} className={classes.links} > Read More </Link> </Button>
                </Box>
        </Box>
    )
}