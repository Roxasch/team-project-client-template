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
          <a className="navbar-brand" href="#">
            <span className="glyphicon glyphicon-home"></span>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse-1">
          <div className="navbar-right">
            <div className="navbar-form pull-right">
              <Link to="/profile">
                <button role="button" className="btn btn-default">Profile</button>
              </Link>
              <button href="#" role="button" className="btn btn-default">Logout</button>
            </div>
          </div>
        </div>
      </nav>
		)
	}
}