import React from 'react';
import ReactDOM from 'react-dom';
import Daily from './components/daily';
import Calendar from './components/calendar';
import Profile from './components/profile';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Navbar}/>
    <Route path="/:date" component={Navbar}/>
    <Route path="/calendar" component={Navbar}/>
    <Route path="/profile" component={Navbar}/>
  </Router>
  ),document.getElementById('nav')
);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Sidebar}/>
    <Route path="/:date" component={Sidebar}/>
    <Route path="/calendar" component={Sidebar}/>
    <Route path="/profile" component={Sidebar}/>
  </Router>
  ),document.getElementById('stats')
);

ReactDOM.render((
  <Router history={hashHistory}>
    {/* make them children of `App` */}
    <Route path="/" component={Daily}/>
    <Route path="/:date" component={Daily}/>
    <Route path="/calendar" component={Calendar}/>
    <Route path="/profile" component={Profile}/>
  </Router>
  ),document.getElementById('changing-data')
);
