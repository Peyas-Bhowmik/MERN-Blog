import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import Login from './components/auth/Login';
import Regester from './components/auth/Regester';
import Home from './components/Home';
import "./main.scss"
import Navbar from './components/Navbar';
import Store from './store';
import DashBoard from './components/DashBoard';
import PrivateRoute from './Private/PrivateRoute';
import RouteLinks from './Private/RouteLinks';
import NotFound from './components/NotFound';
import Create from './components/Create';
import Edit from './components/Edit';
import EditImage from './components/EditImage';
import UpdateName from './components/UpdateName';
import ChangePassword from './components/ChangePassword';
import Details from './components/Details';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home/:page" component={Home} />
          <Route path="/details/:id" component={Details} />
          <RouteLinks path="/regester" component={Regester} />
          <RouteLinks path="/login" component={Login} />
          <PrivateRoute path="/dashboard/:page?" component={DashBoard} />
          <PrivateRoute path="/create" component={Create}/>
          <PrivateRoute path="/edit/:id" component={Edit} />
          <PrivateRoute path="/updateImage/:id" component={EditImage} />
          <PrivateRoute path="/updateName" component={UpdateName} />
          <PrivateRoute path="/updatePassword" component={ChangePassword} />
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
