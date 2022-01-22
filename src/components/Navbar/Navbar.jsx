import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Box,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config";
import { useLocation } from "react-router-dom";
import AdminNav from "../Admin/Navbar";
import MenuIcon from "@material-ui/icons/Menu";


function Navbar({ open, setOpen }) {
  const useStyles = makeStyles((theme) => ({
    appbar: {
      background: "white",
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "fixed",
      // [theme.breakpoints.down("xs")]: {
      // background: "white",
      // width: "unset",
      // display: "block",
      // alignItems: "center",
      // }
    },
    navlinks: {
      display: "flex",
      width: "60%",
      justifyContent: "space-evenly",
      margin: "0",
    },
    logo: {
      flexGrow: "1",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        fontSize: "50px",
        // marginLeft: "3vw",
        height: "auto",
        width: "55vw",
      }
    },
    link: {
      textDecoration: "none",
      color: "black",
      fontSize: "14px",
      padding: "3px 3px",
      display: "flex",
      justifyContent: "center",
      // width: "50%",
      fontWeight: "600",
      textTransform: "uppercase",
      transition: "0.15s ease-in-out all",
      "&:hover": {
        color: "blue",
        border: "none",
        // padding: "4px 5px",
      },
    },
    toolbar: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "30%"
      },
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "0%",
        paddingRight: "0%",
      }
    },
    innerBox: {
      [theme.breakpoints.down("xs")]: {
        minWidth: "0px",
        maxWidth: "0px"
      }
    }
  }));
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const [categoryData, setCategoryData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('/');

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }
    , [location.pathname]);

  useEffect(() => {
    axios.get(url + "/categories").then(res => {

      // get first 7 elements of the array
      setCategoryData(res.data.slice(0, 6));
      setIsReady(true);
    }
    )
  }, [])

  return (
    <Box sx={{ width: "100%" }} >
      {currentLocation.startsWith('/admin') ? (
        <AdminNav />)
        :
        (
          <AppBar id="top" position="sticky" className={classes.appbar} >
            {
              isMobile ?
              <Toolbar className={classes.toolbar} >
                    {/* <DrawerComponent/> */}
                    <IconButton onClick={() => setOpen(!open)} style={{ position: "absolute", left: "-22vw" }}>
                      <MenuIcon />
                    </IconButton>
                    <Box>
                        <img src="/images/logo.png" alt="logo" className={classes.logo} />
                    </Box>
                  </Toolbar>
                  : null
            }
            <Box sx={{ minWidth: "1200px", maxWidth: "1200px" }} className={classes.innerBox}>
              {
                isReady && !isMobile ? (
                    <Toolbar >
                      <Typography variant="h4" className={classes.logo}>
                        <img src="/images/logo.png" alt="logo" style={{ verticalAlign: "none !important" }} />

                      </Typography>
                      {/* <ExtraNav open={showDrop} setdrop={setDrop} /> */}
                      {isMobile ? (
                        <DrawerComponent />
                      ) : (
                        <div className={classes.navlinks}>
                          <Link to="/" className={classes.link}>
                            HOME
                          </Link>
                          {categoryData.map((data, index) => (
                            <Link key={index} to={`/more/${data.slug}?id=${data._id}`} className={classes.link}>
                              {data.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </Toolbar>
                )
                  :
                  null}
            </Box>
          </AppBar>
        )
      }
    </Box>

  );
}
export default Navbar;
