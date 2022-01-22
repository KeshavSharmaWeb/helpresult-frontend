import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Box, makeStyles } from "@material-ui/core";
import { Twitter, Facebook, LinkedIn, ArrowUpward } from "@material-ui/icons";

export default function SocialIcons() {
    const useStyles = makeStyles((theme) => ({
        box: {
            display: "flex",
            justifyContent: "space-between",
            padding: "2%",
            
            borderTop: "1px solid grey",
            maxWidth: "1200px",
            margin: "auto",
            [theme.breakpoints.down("xs")]: {
                flexDirection: "column",
                justifyContent: "center",
                // padding: "10px 20px"
            }
        },
        copyright: {
            // marginLeft: "7%",
            color: "white",
            [theme.breakpoints.down("xs")]: {
                textAlign: "center"
            }
        },
        icons: {
            display: "flex",
            [theme.breakpoints.down("xs")]: {
                display: "flex",
                justifyContent: "center",
                margin: "10px 0px"
            }
        },
        icon: {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px 10px",
            "&:hover": {
                color: "blue",
                background: "white",
                cursor: "pointer"
            },
            [theme.breakpoints.down("xs")]: {
                margin: "0px 5px"
            }
        },
        arrowUp: {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: " 0px 10px",
            color: "#fff",
            "&:hover": {
                cursor: "pointer"
            }
        },
        email: {
            color: "white",
            [theme.breakpoints.down("xs")]: {
                display: "flex",
                justifyContent: "center",
                margin: "10px 0px"
            }
        },
        mailto: {
            color: "whitesmoke",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
                color: "white",
            }
        }
    })
    )
    const classes = useStyles();
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState('/');
    useEffect(() => {
        setCurrentLocation(location.pathname);
    }, [location.pathname])

    return (
        <Box sx={{width: "100%",background: "#132a52",}}>
            {currentLocation.startsWith('/admin') ? (
                null)
                :
                (
                    <Box className={classes.box}>
                        <Box className={classes.copyright}>
                            Copyright 2022. All Rights Reserved.
                        </Box>
                        <Box className={classes.email}>
                            Email:<a className={classes.mailto} href='mailto:srinfotech9238@gmail.com'> srinfotech9238@gmail.com </a>
                        </Box>
                        <Box className={classes.icons}>
                            <Box className={classes.icon}>
                                <Twitter fontSize="small" color="primary" />
                            </Box>
                            <Box className={classes.icon}>
                                <Facebook fontSize="small" color="primary" />
                            </Box>
                            {/* <Box className={classes.icon}>
                    <Google/>
                </Box>      */}
                            <Box className={classes.icon}>
                                <LinkedIn fontSize="small" color="primary" />
                            </Box>
                            <Box>
                                <a href="#top" className={classes.arrowUp} > <ArrowUpward /> </a>
                            </Box>
                        </Box>
                    </Box>

                )
            }
        </Box>
    )
}
