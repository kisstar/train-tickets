import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/home';
import City from './pages/city';
import Time from './pages/time';
import TrainList from './pages/train-list';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/city'>
            <City />
          </Route>
          <Route exact path='/time'>
            <Time />
          </Route>
          <Route exact path='/trainList'>
            <TrainList />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
