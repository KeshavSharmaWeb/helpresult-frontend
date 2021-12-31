import React from 'react'
import { Box, Typography, makeStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Bounce from "react-reveal";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    box: {
        background: "url('/images/footer-bg.jpg')",
        padding: "8%",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        },
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column"
        }
    },
    contact: {
        display: "flex",
        flexDirection: "column",
        color: "grey"
    },
    links: {
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        // padding: "0px 10px",
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }
    },
    link: {
        width: "220px",
        borderBottom: "1px solid white",
        textDecoration: "none",
        margin: "5px 5px",
        color: "#f1ecec",
        transition: "all 0.3s ease-in-out 0s",
        "&:hover": {
            color: "white",
            fontWeight: "700"
        },
        [theme.breakpoints.down("sm")]: {
            width: "110px"
        }
    }
})
)

export default function Footer() {
    // const useStyles = makeStyles((theme) => ({
    //     box: {
    //         background: "url('/images/footer-bg.jpg')",
    //         padding: "8%",
    //         display: "flex",
    //         [theme.breakpoints.down("xs")]: {
    //             flexDirection: "column"
    //         }
    //     },
    //     contact: {
    //         display: "flex",
    //         flexDirection: "column",
    //         color: "grey"
    //     },
    //     links: {
    //         display: "grid",
    //         gridTemplateColumns: "auto auto auto",
    //         padding: "0px 10px",
    //         [theme.breakpoints.down("xs")]: {
    //             display: "flex",
    //             justifyContent: "center",
    //             flexDirection: "column"
    //         }
    //     },
    //     link: {
    //         width: "220px",
    //         borderBottom: "1px solid white",
    //         textDecoration: "none",
    //         margin: "5px 5px",
    //         color: "grey",
    //         "&:hover": {
    //             color: "white",
    //             fontWeight: "700"
    //         }
    //     }
    // })
    // )
    const classes = useStyles();
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState('/');

    useEffect(() => {
        setCurrentLocation(location.pathname);
    }
        , [location.pathname]);

    const data = [
        "UP-scholorship",
        "UPSC",
        "BPSC",
        "RPSC",
        "UPPCS",
        "Coast Guard",
        "UPSSSC",
        "IBPS",
        "Air Force",
        "Delhi DSSB",
        "HSSC",
        "Police Vacancy",
        "CCC",
        "SSC",
        "Navy",
        "Railway",
        "TET",
    ]

    return (
        <Box>
            {currentLocation.startsWith('/admin') ? (
                null)
                :
                (
                    <Bounce left>
                        <Box className={classes.box}>
                            <Box >
                                <Bounce left>
                                    <Typography style={{ color: "white", fontSize: "25px" }} >  CONTACT  </Typography>
                                </Bounce>
                                <Box className={classes.contact}>
                                    <Bounce left>
                                        <Typography style={{ color: "#f1ecec" }}>
                                            Address: <br />
                                            KHASRA NO-4331/,FLAT <br />
                                            NO-14,SKHUNTLA APARTMENT, RANI <br />
                                            KHERA ROAD,MUNDKA,DELHI-110041 <br />
                                        </Typography>
                                    </Bounce>
                                    <Box style={{ margin: "20px 0px", color: "#f1ecec" }} >
                                        <Bounce left>
                                            <Typography>
                                                Phone: +91-7210363680, 7210363681 <br />
                                                Email: srinfotech9238@gmail.com
                                            </Typography>
                                        </Bounce>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{ marginLeft: "40px" }}>
                                <Bounce left>
                                    <Typography style={{ color: "white", fontSize: "25px" }}> USEFUL lINKS </Typography>
                                    <Box className={classes.links} >

                                        {
                                            data.map((val, id) => {
                                                return (
                                                    <Link key={id} className={classes.link} to="/" > {val} </Link>
                                                )
                                            })
                                        }
                                    </Box>
                                </Bounce>
                            </Box>
                        </Box>
                    </Bounce>
                )
            }
        </Box>
    )
}
