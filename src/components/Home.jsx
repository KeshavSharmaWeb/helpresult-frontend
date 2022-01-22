import React from 'react'
import Midsec from './Midsec/Midsec'
import {useTheme,useMediaQuery, Box} from "@material-ui/core";
import MainCard from './Cards/MainCard';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <Box marginTop={isMobile ? "55px" : "75px"}>
            {
                isMobile ? " " : <Midsec/>  
            }
            <MainCard/>
            {/* <News/> */}
        </Box>
    )
}
