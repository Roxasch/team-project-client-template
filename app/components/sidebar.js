import React from 'react';
import { Link } from 'react-router';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.params.date === undefined) {
      var currentDate = (new Date().getMonth())*100000
                       +(new Date().getDate())*1000
                       +(new Date().getYear());
    } else {
      currentDate = this.props.params.date;
    }

    var ds = this.calcDate(currentDate);

    this.state = {
      "date": currentDate,
      "dateString": ds
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

    var ds = this.calcDate(currentDate);

    this.setState({'date': currentDate, 'dateString': ds});
  }

  calcDate(date) {
    var m = parseInt(date/100000);
    var d = parseInt(date/1000) - m*100;
    return m+1 + '/' + d
  }

  render() {
    return (
      <div className="col-xs-12 col-md-2 col-sm-3" id="stats">
        <div className="row">
          <div className="col-sm-12">
            <h1>{ this.state.dateString }</h1>
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