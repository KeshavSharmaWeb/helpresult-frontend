import React from 'react'
import { Box,  Typography ,makeStyles} from "@material-ui/core";
import Card from './Card';


export default function News() {
    const useStyles = makeStyles((theme) => ({
        box: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "1200px",
            margin: "auto"
        },
        upperBox: {
            textAlign: "center",
            margin: "30px 0px",
            [theme.breakpoints.down('xs')]:{
                display: "flex",
                flexWrap: "wrap",
                margin: "5px",
                justifyContent: "center"
            }
        },
        lowerBox: {
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            padding: "1% 10%",
            columnGap: "20px",
            rowGap: "20px",
            [theme.breakpoints.down("sm")]:{
                gridTemplateColumns: "auto auto",
                margin: "30px 10px"
            },
            [theme.breakpoints.down("xs")]:{
                display: "flex",
                flexDirection: "column",
                margin: "30px 10px"
            }     
        },
    }))

    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Box className={classes.upperBox}>
                <Typography style={{fontSize: "30px", fontWeight: "800"}} >  GOVERNMENT JOBS NEWS </Typography>
                <Typography style={{color: "gray"}} > We have the experience and the knowledge to get your vision comes true </Typography>
            </Box>
            <Box className={classes.lowerBox}>
                <Card/>
            </Box>
        </Box>
    )
}
