import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import Fade from "react-reveal";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config";
import { useLocation } from "react-router-dom";
import AdminNav from "../Admin/Navbar";


function Navbar() {
  const useStyles = makeStyles((theme) => ({
    appbar: {
      background: "white",
    },
    navlinks: {
      display: "flex",
      width: "80%",
      justifycontent: "space-evenly",
      margin: "0px 10px",
    },
    logo: {
      flexGrow: "1",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        fontSize: "50px",
        marginLeft: "3vw",
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
      width: "50%",
      fontWeight: "600",
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
        paddingLeft: "6%"
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
    <Box >
      {currentLocation.startsWith('/admin') ? (
        <AdminNav />)
        :
        (
          <Fade left >
            <AppBar id="top" position="sticky" className={classes.appbar} >
              <CssBaseline />
              {
                isReady ? (
                  isMobile ? <Toolbar className={classes.toolbar} >
                    <DrawerComponent />
                    {isMobile ? (
                      <Typography variant="h4" className={classes.logo}>
                        <img src="/images/logo.png" alt="logo" className={classes.logo} />
                      </Typography>
                    ) : (
                      <div className={classes.navlinks}>
                        <Link to="/" className={classes.link}>
                          HOME
                        </Link>
                        {categoryData.map((data, index) => (
                          <Link to={`/more/${data.slug}?id=${data._id}`} className={classes.link}>
                            {data.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </Toolbar>
                    :
                    <Toolbar >
                      <Typography variant="h4" className={classes.logo}>
                        <img src="/images/logo.png" alt="logo" style={{ verticalAlign: "none !important" }} />

                      </Typography>
                      {isMobile ? (
                        <DrawerComponent />
                      ) : (
                        <div className={classes.navlinks}>
                          <Link to="/" className={classes.link}>
                            HOME
                          </Link>
                          {categoryData.map((data, index) => (
                            <Link to={`/more/${data.slug}?id=${data._id}`} className={classes.link}>
                              {data.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </Toolbar>
                )
                  :
                  null}
            </AppBar>
          </Fade>
        )
      }
    </Box>

  );
}
export default Navbar;
