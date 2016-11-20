import React from 'react';
import FoodPanel from './foodpanel';
import ExercisePanel from './exercisepanel';
import AddPanel from './addpanel';
import { getDayData } from '../server';

export default class Daily extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    getDayData(1, 1, (dayData) => {
      this.setState(dayData);
    })
  }

  render() {
    return (
      <div>
        <link href="css/daily.css" rel="stylesheet"/>
        <div className="col-md-1"></div>
        <div className="col-md-10 col-sm-12" id="changing-data">
          <div className="row">
            <div className="col-xs-12">
              <FoodPanel data={this.state} />
              <ExercisePanel data={this.state} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <AddPanel />
            </div>
          </div>
        </div>
      </div>
    )
  }
}