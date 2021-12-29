import React from 'react'
import { Box, makeStyles } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Rotate from "react-reveal";

import {formattedDate} from "../helperFns";



export default function TableBox({ title, data }) {
    const useStyles = makeStyles((theme) => ({
        box: {
            display: "flex",
            flexDirection: "column",
            margin: "5% 10%",
            [theme.breakpoints.down("sm")]: {
                margin: "5% 6%"
            }
        },
        title: {
            background: "#014e92",
            fontSize: "27px",
            lineHeight: "30px",
            marginBottom: "18px",
            fontStyle: "normal",
            letterSpacing: "0.5px",
            textAlign: "center",
            color: "white",
            padding: "10px 0px"
        },
        desc: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: "5px 10px",
        },
        li: {
            listStyle: "none",
            fontWeight: "500",
            width: "100%",
            margin: "4px 0px",
            borderBottom: "1px solid black",
            paddingBottom: "5px",
            color: "#727272",
            "&:hover": {
                fontWeight: "900",
                color: "black",
                cursor: "pointer"
            },
        },
        navLink: {
            textDecoration: "none",
            color: "#727272",
            "&:hover": {
                color: "black"
            }
        }
    })
    )
    const classes = useStyles();

    return (
        <Rotate right>
            <Box className={classes.box}>
                <Box className={classes.title}>
                    {title}
                </Box>
                {

                    data.length > 0 ?
                        <Box className={classes.desc}>
                            {
                                data.map((val) => {
                                    return <><li key={val._id} className={classes.li}> <CheckBox style={{ background: "#0868fe", color: "white", fontSize: "16px" }} /> <Link to={`/details/${val.slug}?id=${val._id}`} className={classes.navLink} > {val.name} </Link>
                                    <span style={{ color: "black", fontWeight: 900 }}>{ val.last_date ? `  Last Date : ${formattedDate(val.last_date)}` : null}</span>
                                    </li>
                                    </>
                                })
                            }
                        </Box> :
                        <h3 style={{ textAlign: "center" }}>No data found</h3>
                }
            </Box>
        </Rotate>
    )
}