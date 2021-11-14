import React from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import Flip from "react-reveal";

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "column",
        margin: "5% 10%",
        [theme.breakpoints.down("sm")]: {
            margin: "5% 6%"
        }
    },
    row: {
        display: "flex",
        margin: "10px 0px"
    },
    title: {
        color: "#ff0033",
        width: "20%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
            marginRight: "5%"
        }
    },
    desc: {
        width: "100%",
        fontSize: "medium",
        [theme.breakpoints.down("sm")]: {
            width: "80%"
        }
    }
})
)


export default function Details() {
    const query = new URLSearchParams(window.location.search)
    const token = query.get('name')
    const classes = useStyles();

    return (
        <Flip right>
            <Box className={classes.box}>
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Name of Post :
                    </Box>
                    <Box className={classes.desc}>
                        <Typography style={{ fontSize: "25px", color: "#0F3063" }}> {token} </Typography>
                    </Box>
                </Box>
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Post Update:
                    </Box>
                    <Box className={classes.desc}>
                        12 November 2021 | 12:30 PM
                    </Box>
                </Box>
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Short Information:
                    </Box>
                    <Box className={classes.desc}>
                        Uttar Pradesh Power Corporation Limited (UPPCL) has Recently Uploaded Result for the Post of Lekha Lipik (102 Post) Recruitment 2020. Those Candidates Who have Appeared in this Recruitment can Download Result.
                    </Box>
                </Box>
            </Box>
        </Flip>
    )
}
