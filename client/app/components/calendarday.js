import React from 'react';
import { Link } from 'react-router';
import { getDay } from '../server';

export default class CalendarDay extends React.Component {

  constructor(props) {
    super(props);
    this.state=props.data
  }

  dateNumber() {
    return this.state.month*100000+this.state.day*1000+this.state.year;
  }

  componentDidMount() {
    getDay("000000000000000000000001", ("000000000000000000000000" + this.dateNumber()).slice(-24), (value) => {
      this.setState({'value': value});
    });
  }

  render() {
    var dots = [];
    if((this.state.value-1)%2 == 0) dots.push(
          <div className="row" key={'y'}>
            <div className="col-xs-12">
              <span className="yellow">●</span>
            </div>
          </div>);
    if(this.state.value > 1) dots.push(
          <div className="row" key={'b'}>
            <div className="col-xs-12">
              <span className="blue">●</span>
            </div>
          </div>);

    return (
      <Link className="l" to={'/date/'+this.dateNumber()} >
        <li className="day">
          { this.state.day }
          <div className="row">
            <div className="col-xs-12">
              { dots }
            </div>
          </div>
        </li>
      </Link>
    )
  }
}