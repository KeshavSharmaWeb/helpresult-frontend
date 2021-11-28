import React, { useEffect, useState } from 'react'
import {Box,makeStyles} from "@material-ui/core";
import Card from './Card';
import axios from 'axios';
import { url } from '../../config';

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
    const [categoryData, setCategoryData] = useState([]);
    const [recordData, setRecordData] = useState([]);

    useEffect(() => {
        axios.get(url+"/categories").then(res => {
            setCategoryData(res.data);
        }
        )
        axios.get(url+"/records").then(res => {
            setRecordData(res.data);
        }
        )
    }, [])
    return (
        <Box className={classes.box}>
            {categoryData.map(item => {
                const data = recordData.filter(record => record.categoryId === item._id);
                
                return (
                    <Box>
                    {data.length > 0 ? <Card key={item._id} title={item.name} slug={item.slug} categoryId={item._id} recordData={data} />:null}
                    </Box>
                )
            })}
        </Box>
    )
}
