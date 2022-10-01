import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import CreateAuction from "./components/auction/CreateAuction";
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import Posts from "./components/Posts";
import RenderAuction from "./components/auction/RenderAuction";
import AuctionDetails from "./components/auction/AuctionDetails";
import LandingPage from "./components/LandingPage";
import UploadLuaComponent from "./components/lua/upload_lua"
import InviteGenerateComponent from "./components/lua/generate_invite"
import YouTubeGuide from "./components/youtube guide/youtube"

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { returnErrors } from './actions/errorActions';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
      <Provider store={store}>
        
        <div className='App'>
          <AppNavbar />
          <Route path="/" exact>
             <LandingPage />
          </Route>

          {/* <Container>
            <ItemModal />
            <ShoppingList />
            <Posts/>
          </Container> */}
        <Switch>
         
          <Route path="/upload_lua" exact component={UploadLuaComponent} />

          <Route path="/generate_invite" exact component={InviteGenerateComponent} />

          <Route path="/users" exact component={YouTubeGuide} />

        </Switch>

        </div>
        
      </Provider>
      </Router>
    );
  }
}

export default App;
