import React from 'react'
import Data from "../Cards/data.json";
import TableBox from '../TableBox';

export default function Result() {
    return (
        <TableBox title="Result" data={Data} />
    )
}
