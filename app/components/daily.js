import React from 'react';
import FoodPanel from './foodpanel';
import ExercisePanel from './exercisepanel';
import AddPanel from './addpanel';
import { getDayData, postDayItem } from '../server';
import Sidebar from './sidebar';

export default class Daily extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.params.date === undefined) {
      var currentDate = (new Date().getMonth())*100000
                       +(new Date().getDate())*1000
                       +(new Date().getYear());
    } else {
      currentDate = this.props.params.date;
    }
    this.state = {
      "date": currentDate
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.date === undefined) {
      var currentDate = (new Date().getMonth())*100000
                       +(new Date().getDate())*1000
                       +(new Date().getYear());
    } else {
      currentDate = nextProps.params.date;
    }
    this.setState({'date': currentDate}, () => {
      this.refresh();
    });
  }

  componentDidMount() {
    getDayData(1, this.state.date, (dayData) => {
      this.setState({'data': dayData});
    })
  }

  refresh() {
    getDayData(1, this.state.date, (dayData) => {
      this.setState({'data': dayData});
    })
  }

  handlePost(add, type) {
    postDayItem(1, this.state.date, add, type, () => {
      this.refresh();
    })
  }

  render() {
    return (
      <div>
        <Sidebar data={this.state}/>
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
              <AddPanel onPost={(a,t) => {this.handlePost(a,t)}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}