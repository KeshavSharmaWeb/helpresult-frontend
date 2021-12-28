import React, { useEffect, useState } from 'react'
import { Box, makeStyles } from "@material-ui/core";
import TestCard from './TestCard';
import Card from './Card';
import axios from 'axios';
import { url } from '../../config';
import ExtraCard from './ExtraCard';


const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        padding: "3% 6%",
        justifyContent: "space-evenly",
        background: "#f2edf4",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            padding: "2%",
            display: "flex",
            justifyContent: "space-evenly",
            margin: "30px 10px",
        },
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
            margin: "30px 10px"
        }
    },
    extraBox: {
        [theme.breakpoints.down("sm")]: {
            display: "grid",
            gridTemplateColumns: "auto auto",
            margin: "30px 10px"
        },
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column",
            margin: "30px 10px"
        }
    },
    cardBox: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridTemplateRows: "auto auto",
        gridColumnGap: "15px",
        [theme.breakpoints.down("xs")]:{
            display: "flex",
            flexDirection: "column",
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

            {/* place all the cards here  */}
            <Box className={classes.cardBox}>
                {/* {categoryData.map(item => {
                const data = recordData.filter(record => record.categoryId === item._id);
                
                return (
                    <Box>
                    {data.length > 0 ? <Card key={item._id} title={item.name} slug={item.slug} categoryId={item._id} recordData={data} />:null}
                    </Box>
                )
            })} */}

            {/* dummy  */}
                <TestCard extend={false} title="Result"  records={recordData.filter(record => record.categoryId == "61c7fcc58b071fa93f007477")} />
                <TestCard extend={false} title="Admit Card" records={recordData.filter(record => record.categoryId == "61c7fcc88b071fa93f007479")} />
                <TestCard extend={true} title="Latest Jobs" records={recordData.filter(record => record.categoryId == "61c7fccb8b071fa93f00747b")} />
                <ExtraCard records={recordData}/>
            </Box>
            {/* <Box className={classes.extraBox}>
                <ExtraCard alternate={true} />
            </Box> */}
        </Box>
    )
}
