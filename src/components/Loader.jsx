import { CircularProgress } from '@material-ui/core'
import React from 'react'
import Box from '@material-ui/core/Box'

const Loader = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: 10 }}>
            <CircularProgress
                color="blue"
                size={50}
                
            />
        </Box>
    )
}

export default Loader
