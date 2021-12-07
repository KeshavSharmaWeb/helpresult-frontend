import { Box } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { url } from '../../config';
import TableBox from '../TableBox';

export default function Result() {
    const query = new URLSearchParams(window.location.search)
    const id = query.get('id')

    const [data, setData] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    const [ready, setReady] = useState(false);
    // eslint-disable-next-line
    useEffect(async () => {
        await axios.get(`${url}/categories?_id=${id}`).then(res => {
            setCategoryName(res.data[0].name);
        })

        await axios.get(url + "/records?categoryId=" + id).then(res => {
            setData(res.data);
        })
        setReady(true);
    }, [id])

    return (
        <Box>
            {ready ? <TableBox title={categoryName} data={data} /> : ''}

        </Box>
    )
}
