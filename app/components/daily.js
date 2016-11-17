import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import FoodPanel from './foodpanel';
import ExercisePanel from './exercisepanel';
import AddPanel from './addpanel';

export default class Daily extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <link href="css/daily.css" rel="stylesheet"/>
        <Navbar/>
        <Sidebar/>
        <div className="col-xs-12 col-md-2 col-sm-3"></div>
        <div className="col-md-10 col-sm-9" id="changing-data">
          <div className="row">
            <div className="col-xs-12">
              <FoodPanel/>
              <ExercisePanel/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <AddPanel/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}