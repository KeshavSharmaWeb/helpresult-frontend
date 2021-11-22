import { Box } from '@material-ui/core';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { url } from '../../config';
import TableBox from '../TableBox';

export default function Result() {
    const query = new URLSearchParams(window.location.search)
    const id = query.get('id')

    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        axios.get(url + "/records?categoryId=" + id).then(res => {
            setData(res.data);
            setReady(true);
        }
        )
    }, [])

    return (
        <Box>
            {ready ? <TableBox title={data.name} data={data} /> : <div>Loading...</div>}
        </Box>
    )
}
