import React from 'react'
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';


export default function Boxex({ record, backcolor }) {
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
        <Link to={`/details/${record.name}?id=${record.recordId}`} style={{ textDecoration: "none" }}>
        <Box className={classes.box} style={{ background: backcolor }} >
            <Typography className={classes.typo}> {record.name} </Typography>
        </Box>
        </Link>
    )
}
