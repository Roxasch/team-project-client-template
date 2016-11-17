import React from 'react';
import { Link } from 'react-router';

export default class Sidebar extends React.Component {

  render() {
    return (
      <div className="col-xs-12 col-md-2 col-sm-3" id="stats">
        <div className="row">
          <div className="col-sm-12">
            <h1>Date</h1>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <a href="#" role="button" className="btn btn-default" id="graph">
              there will be a graph here
            </a>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            There will be some more information about your day here
          </div>
        </div>
      </div>
    )
  }
}