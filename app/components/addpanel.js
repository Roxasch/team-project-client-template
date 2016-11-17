import React from 'react';
import { Link } from 'react-router';
import SearchReply from './searchreply'

export default class AddPanel extends React.Component {

  render() {

    var rows = [];
    for (var i=0; i<6; i++) {
      rows.push(<SearchReply key={i}/>);
    }
    if (rows.length < 1){
      rows.push(
        <div className="row" key={'key'}>
          <div className="col-md-12 result" key={'key'}>
            <h1 key={'key'}>No results for this search.</h1>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="col-md-3 visible-md visible-lg"></div>
        <div className="col-sm-12 col-md-6">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="col-sm-8">
                <ul>
                  { rows }
                </ul>
              </div>
              <div className="col-sm-4">
                <div className="input-group">
                  <input type="text" placeholder="Search"></input>
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-default">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}