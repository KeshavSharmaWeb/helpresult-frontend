import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Typography } from "@material-ui/core";
import Flip from "react-reveal";
import axios from 'axios';
import { url } from '../config';
import parse from 'html-react-parser';
import "../App.css"



export default function Details() {
    // eslint-disable-next-line
    String.prototype.replaceAll = function(strReplace, strWith) {
        // eslint-disable-next-line
        var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var reg = new RegExp(esc, 'ig');
        return this.replace(reg, strWith);
    };

    const useStyles = makeStyles((theme) => ({
        box: {
            display: "flex",
            flexDirection: "column",
            color: "black !important",
            margin: "1% 32% 5% 9%",
            [theme.breakpoints.down("sm")]: {
                margin: "5% 6%"
            }
        },
        row: {
            display: "flex",
            margin: "10px 0px",
            flexDirection: "column"
        },
        title: {
            color: "#ff0033",
            // width: "20%",
            display: "flex",
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
    const query = new URLSearchParams(window.location.search)
    const id = query.get('id')

    const classes = useStyles();
    const [more_data_html, setMoreDataHtml] = useState('<h3 style="text-align: center">Loading...</h3>');

    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        axios.get(url + "/records?_id=" + id).then(res => {
            setData(res.data[0]);
            setReady(true);
            document.title = res.data[0].name;
            setMoreDataHtml((res.data[0].more_data_html).replaceAll("WWW.SARKARIRESULT.COM", '').replaceAll('sarkariresult.com', 'HelpResult.com').replaceAll('sarkari result', '').replaceAll('https://t.me/sarkari', '').replaceAll('sarkari-result', 'help-result.com').replaceAll('https://itunes.apple.com/us/app/sarkari-result/id1051363935?ls=1&mt=8', '').replaceAll('https://itunes.apple.com/us', '').replaceAll('id1051363935', '').replaceAll('https://play.google.com/store/apps/details?id=com.app.app14f269771c01', '').replaceAll('com.app.app14f269771c01', '').replaceAll('android apps', '').replaceAll('apple ios apps', '').replaceAll('window apps', '').replaceAll('9nblggh6cm69', ''));
        }
        )
    }, [id])

    return (
        <Flip right>
            {ready ?
            <Box className={classes.box}>
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Name of Post :
                    </Box>
                    <Box className={classes.desc}>
                        <Typography style={{ fontSize: "medium" }}>{data.name}</Typography>
                    </Box>
                </Box>
                    <Box className={classes.row}>
                    <Box className={classes.title}>
                        Post Update:
                    </Box>
                    <Box className={classes.desc}>
                    {data.updated_at ?( (new Date(data.updated_at).toLocaleString()).toLowerCase() === "invalid date" ? data.updated_at : new Date(data.updated_at).toLocaleString()) : data.created_at}

                    </Box>
                </Box>
                <Box className={classes.row}>
                    <Box className={classes.title}>
                        Short Information:
                    </Box>
                    <Box className={classes.desc} sx={{ textAlign: "justify !important" }}>
                        {data.short_information}
                    </Box>
                </Box>
                <Box className={classes.row} >
                    {parse(more_data_html)}
                </Box>
            </Box>
            : ''}

        </Flip>
    )
}
