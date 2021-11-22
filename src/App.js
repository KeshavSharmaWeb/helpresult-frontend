import {BrowserRouter as Router,Route  } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Result from "./components/ResultPage/Result";
import Footer from './components/footer/Footer';
import SocialIcons from './components/footer/SocialIcons';
import React, {useState, useEffect} from 'react';
import { url } from "./config";
import axios from "axios";

function App() {
  // const [categoryData, setCategoryData] = useState([]);
  // const [recordData, setRecordData] = useState([]);

  // useEffect(() => {
  //     axios.get(url+"/categories").then(res => {
  //         setCategoryData(res.data);
  //     }
  //     )
  //     axios.get(url+"/records").then(res => {
  //         setRecordData(res.data);
  //     }
  //     )
  // }, [])
  
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={Home} />
      <Route path="/details" component={Details} />
      <Route path="/more" component={Result} />
      <Footer/>
      <SocialIcons/>
    </Router>
  );
}

export default App;
