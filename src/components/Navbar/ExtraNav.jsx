import React, {useEffect, useState} from 'react'
import {Box , List,ListItem,ListItemText , makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import axios from "axios";
import { url } from "../../config";

const useStyles = makeStyles(() => ({
    link: {
      textDecoration: "none",
      color: "black",
      fontSize: "14px",
      borderBottom: "1px solid grey",
      width: "100%",
      padding: "10px 25px",
      display: "flex"
    },
    icon: {
      color: "white"
    },
    showBox:{
        width: "100%",
        height: "50%",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        transition: "all 5s ease-in-out"
    },
    hideBox:{
        display: "none"
    }
  }));

export default function ExtraNav({open}) {
    const classes = useStyles();
    const [categoryData, setCategoryData] = useState([]);
  
    useEffect(() => {
        axios.get(url + "/categories").then(res => {
    
          // get first 7 elements of the array
          setCategoryData(res.data.slice(0, 6));
        }
        )
      }, []);
    return (
        <Box className={`${open ? classes.showBox : classes.hideBox}` }>
            <List>
          <ListItem >
            <ListItemText>
              <Link to="/" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          {categoryData.map((data, index) => (
          <ListItem key={index} >
            <ListItemText>
              <Link to={`/more/${data.slug}?id=${data._id}`} className={classes.link}>{data.name}</Link>
            </ListItemText>
          </ListItem>
          ))}

        </List>
        </Box>
    )
}
