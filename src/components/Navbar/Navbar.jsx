import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import Fade from "react-reveal";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#f4e8f1",
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
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "12px",
    padding: "5px 5px",
    display: "flex",
    justifyContent: "center",
    width: "50%",  
    fontWeight: "500",
    "&:hover": {
      color: "blue",
      border: "none",
      padding: "4px 5px",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Fade left >
    <AppBar  id="top" position="sticky" className={classes.appbar} >
      <CssBaseline />
      <Toolbar >
        <Typography variant="h4" className={classes.logo}>
          <img src="/images/logo.png" alt="logo" style={{marginTop: "10px"}} />
          
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              HOME
            </Link>
            <Link to="/result" className={classes.link}>
              RESULT
            </Link>
            <Link to="/" className={classes.link}>
              ADMIT CARD
            </Link>
            <Link to="/" className={classes.link}>
              LATEST JOBS
            </Link>
            <Link to="/" className={classes.link}>
              ADMISSION
            </Link>
            <Link to="/" className={classes.link}>
              SYLLABUS
            </Link>
            <Link to="/" className={classes.link}>
              ANSWER KEY
            </Link>
            <Link to="/" className={classes.link}>
              JOB ALERT
            </Link>
            <Link to="/" className={classes.link}>
              MORE
            </Link>
            <Link to="/" className={classes.link}>
              CONTACT
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
    </Fade>
  );
}
export default Navbar;