import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {

	render() {
		return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" 
                  data-toggle="collapse" 
                  data-target="#navbar-collapse-1" 
                  aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
            <Link className="navbar-brand" to="/">
              <span className="glyphicon glyphicon-home"></span>
            </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse-1">
          <div className="navbar-right">
            <div className="navbar-form pull-right">
              <Link to="/calendar">
                <button role="button" className="btn btn-default">Calendar</button>
              </Link>
              <button href="#" role="button" className="btn btn-default">Logout</button>
            </div>
          </div>
        </div>
      </nav>
		)
	}
}