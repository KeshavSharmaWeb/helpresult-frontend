import { BrowserRouter as Router, Route } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Result from "./components/ResultPage/Result";
import SocialIcons from './components/footer/SocialIcons';
import Admin from "./components/Admin";
import Categories from "./components/Admin/Categories";
import SubCategories from "./components/Admin/SubCategories";
import Records from "./components/Admin/Records";
import EditRecord from "./components/Admin/EditRecord";
import AddRecord from "./components/Admin/AddRecord";
import Login from "./components/Login";
import AddUser from "./components/Admin/AddUser";
import EditUser from "./components/Admin/EditUser";
import Users from "./components/Admin/Users";
import NewsRecord from "./components/Admin/NewsRecord";
import {useState} from "react"
import ExtraNav from "./components/Navbar/ExtraNav";

function App() {

  const changeComponentToLogin = (Component) => {
    if (localStorage.getItem('user')) {
      return <Component />;
    } else {
      return <Login />;
    }
  }

  const [drop,setDrop] = useState(false)

  return (
    <Router>
      <Navbar open={drop} setOpen={setDrop} />
      <ExtraNav open={drop} setOpen={setDrop} />
      <Route path="/" exact component={Home} />
      <Route path="/details/:name" exact component={Details} />
      <Route path="/more/:name" exact component={Result} />
      {/* ADMIN ROUTES */}
      <Route path="/admin" exact render={() => changeComponentToLogin(Admin)} />
      <Route path="/admin/dashboard" exact render={() => changeComponentToLogin(Admin)} />
      <Route path="/admin/categories" exact render={() => changeComponentToLogin(Categories)} />

      <Route path="/admin/sub-categories" exact render={() => changeComponentToLogin(SubCategories)} />

      <Route path="/admin/records" exact render={() => changeComponentToLogin(Records)} />
      <Route path="/admin/records/add" exact render={() => changeComponentToLogin(AddRecord)} />
      <Route path="/admin/records/edit" exact render={() => changeComponentToLogin(EditRecord)} />

      <Route path="/admin/users" exact render={() => changeComponentToLogin(Users)} />
      <Route path="/admin/users/add" exact render={() => changeComponentToLogin(AddUser)} />
      <Route path="/admin/users/edit" exact render={() => changeComponentToLogin(EditUser)} />

      <Route path="/admin/news-records" exact render={() => changeComponentToLogin(NewsRecord)} />

      <Route path="/admin/login" exact render={(props) => <Login {...props} />} />
      {/* <Footer /> */}
      <SocialIcons />
    </Router>
  );
}

export default App;
