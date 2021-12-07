import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";


export default function Boxex({ title, backcolor }) {
    const useStyles = makeStyles((theme) => ({
        box: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            flexWrap: "wrap",
            padding: "10px",
            [theme.breakpoints.down('sm')]: {
                padding: "4px",
            },
        },
        typo: {
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center"
        }
    })
    )
    const classes = useStyles()
    return (
        <Box className={classes.box} style={{ background: backcolor }} >
            <Typography className={classes.typo}> {title} </Typography>
        </Box>
    )
}
