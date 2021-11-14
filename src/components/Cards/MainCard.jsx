import React from 'react'
import {Box,makeStyles} from "@material-ui/core";
import Card from './Card';

const useStyles = makeStyles((theme) =>({
    box:{
        display: "grid",
        padding: "3% 6%",
        gridTemplateColumns: "auto auto auto",
        columnGap: "20px",
        rowGap: "20px",
        background: "#f2edf4",
        [theme.breakpoints.down("sm")]:{
            gridTemplateColumns: "auto auto",
            margin: "30px 10px"
        },
        [theme.breakpoints.down("xs")]:{
            display: "flex",
            flexDirection: "column",
            margin: "30px 10px"
        }
    }
})
)


export default function MainCard() {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Card title="Result" path="/result" />
            <Card title="Admit Card" path="/" />
            <Card title="Latest Jobs" path="/" />
            <Card title="Answer Key" path="/" />
            <Card title="Syllabus" path="/" />
            <Card title="Admission" path="/" />
        </Box>
    )
}
