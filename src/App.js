import {BrowserRouter as Router,Route  } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Result from "./components/ResultPage/Result";
import Footer from './components/footer/Footer';
import SocialIcons from './components/footer/SocialIcons';
import Admin from "./components/Admin";
import Categories from "./components/Admin/Categories";
import Records from "./components/Admin/Records";

function App() {
  
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={Home} />
      <Route path="/details/:name" exact component={Details} />
      <Route path="/more/:name" exact component={Result} />
      {/* ADMIN ROUTES */}
      <Route path="/admin/dashboard" exact component={Admin} />
      <Route path="/admin/categories" exact component={Categories} />
      <Route path="/admin/records" exact component={Records} />

      <Footer/>
      <SocialIcons/>
    </Router>
  );
}

export default App;
