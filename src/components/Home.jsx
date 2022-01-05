import React from 'react'
import Midsec from './Midsec/Midsec'
import {useTheme,useMediaQuery} from "@material-ui/core";
import MainCard from './Cards/MainCard';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <>
            {
                isMobile ? " " : <Midsec/>  
            }
            <MainCard/>
            {/* <News/> */}
        </>
    )
}
