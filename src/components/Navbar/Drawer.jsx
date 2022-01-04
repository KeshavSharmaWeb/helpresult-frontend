import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../config";


function DrawerComponent() {
  const [categoryData, setCategoryData] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const useStyles = makeStyles(() => ({
    link: {
      textDecoration: "none",
      color: "blue",
      fontSize: "14px",
      "&:hover": {
        color: "Red",
        border: "none",
        borderBottom: "1px solid black",
      }
    },
    icon: {
      color: "white"
    },

  }));

  useEffect(() => {
    axios.get(url + "/categories").then(res => {

      // get first 7 elements of the array
      setCategoryData(res.data.slice(0, 6));
      setIsReady(true);
    }
    )
  }, [])

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Box >
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        style={{marginTop: "20px"}}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          {categoryData.map((data, index) => (
          <ListItem key={index} onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to={`/more/${data.slug}?id=${data._id}`} className={classes.link}>{data.name}</Link>
            </ListItemText>
          </ListItem>
          ))}

        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
export default DrawerComponent;