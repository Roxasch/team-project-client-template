import React from 'react';
import ReactDOM from 'react-dom';
import Daily from './components/daily';
import Calendar from './components/calendar';
import Profile from './components/profile';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
      {/* make them children of `App` */}
      <Route path="/" component={Daily}/>
      <Route path="/calendar" component={Calendar}/>
      <Route path="/profile" component={Profile}/>
  </Router>
  ),document.getElementById('app')
);
