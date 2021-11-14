import React from 'react'
import {Box,makeStyles} from "@material-ui/core";
import {Twitter,Facebook,LinkedIn, ArrowUpward } from "@material-ui/icons";
import LightSpeed from "react-reveal"

const useStyles = makeStyles( (theme) =>  ({
    box:{
        display: "flex",
        justifyContent: "space-between",
        padding: "2%",
        background: "#132a52",
        borderTop: "1px solid grey",
        [theme.breakpoints.down("xs")]:{
            flexDirection: "column",
            justifyContent: "center",
            // padding: "10px 20px"
        }
    },
    copyright:{
        marginLeft: "7%",
        color: "white",
        [theme.breakpoints.down("xs")]:{
            textAlign: "center"
        }
    },
    icons:{
        display: "flex",
        [theme.breakpoints.down("xs")]:{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0px"
        }
    },
    icon:{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0px 10px",
        "&:hover":{
            color: "blue",
            background: "white",
            cursor: "pointer"
        },
        [theme.breakpoints.down("xs")]:{
            margin: "0px 5px"
        }
    },
    arrowUp:{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: " 0px 10px",
        color: "#fff",
        "&:hover":{
            cursor: "pointer"
        }
    }
})
)
export default function SocialIcons() {
    const classes = useStyles();
    return (
        <LightSpeed right>
        <Box className={classes.box}>
            <Box className={classes.copyright}>
                Copyright 2020 [Website name]
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
                    <LinkedIn fontSize="small" color="primary"  />
                </Box>     
                <Box>
                    <a href="#top" className={classes.arrowUp} > <ArrowUpward  /> </a>
                </Box>        
            </Box>
        </Box>
        </LightSpeed>
    )
}
