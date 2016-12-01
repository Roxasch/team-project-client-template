import React from 'react';
import ReactDOM from 'react-dom';
import Daily from './components/daily';
import Calendar from './components/calendar';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Navbar}/>
    <Route path="/date/:date" component={Navbar}/>
    <Route path="/calendar" component={Navbar}/>
  </Router>
  ),document.getElementById('nav')
);

ReactDOM.render((
  <Router history={hashHistory}>
    {/* make them children of `App` */}
    <Route path="/" component={Daily}/>
    <Route path="/date/:date" component={Daily}/>
    <Route path="/calendar" component={Calendar}/>
  </Router>
  ),document.getElementById('changing-data')
);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/"/>
    <Route path="/date/:date"/>
    <Route path="/calendar" component={Sidebar}/>
  </Router>
  ),document.getElementById('stats')
);
