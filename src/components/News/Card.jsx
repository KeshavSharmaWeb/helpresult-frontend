import React from 'react'
import { Button,Box, makeStyles} from "@material-ui/core";
import Data from "./data.json"
import Rotate from "react-reveal";

const useStyles = makeStyles((theme) =>({
    box:{
        display: "flex",
        flexDirection: "column",
        background: "#f7f7f9",
        padding: "10px",
    },
    boxHeading:{
        textAlign: "center",
        fontSize: "25px",
        color: "#014e92",
        fontWeight: "600"
    },
    boxDesc: {
        color: "gray"
    }
})
)


export default function Card() {
    const classes = useStyles()
    return (
        <Rotate bottom right>
            {
                Data.map((val, id) => {
                    return (
                        <Box key={id} className={classes.box}>
                            <Box className={classes.boxHeading}>
                                {val.title}
                            </Box>
                            <Box className={classes.boxDesc}>
                                {val.desc}
                            </Box>
                            <Box style={{textAlign: "end"}}>
                                <Button> Read More </Button>
                            </Box>
                        </Box>
                    )
                })
            }
        </Rotate>
    )
}
