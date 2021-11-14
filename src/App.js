import {BrowserRouter as Router,Route  } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Result from "./components/ResultPage/Result";
import Footer from './components/footer/Footer';
import SocialIcons from './components/footer/SocialIcons';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={Home} />
      <Route path="/result" exact component={Result} />
      <Route path="/full" exact component={Details} />
      <Footer/>
      <SocialIcons/>
    </Router>
  );
}

export default App;
