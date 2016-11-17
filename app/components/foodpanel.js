import React from 'react';
import { Link } from 'react-router';
import FoodItem from './fooditem';

export default class FoodPanel extends React.Component {

  render() {
    var rows = [];
    for (var i=0; i<6; i++) {
      rows.push(<FoodItem key={i}/>);
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
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <h1>Diet
                </h1>
              </div>
              <div className="col-sm-12">
                <ul>
                  { rows }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}