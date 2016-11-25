import React from 'react';
import { Link } from 'react-router';
import CalendarDay from './calendarday';

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getYear()
    }
  }

  getMonthName(month) {
    var m = ["January", "February", "March", "April", 
             "May", "June", "July", "August", 
             "September", "October", "November", "December"];
    return m[month];
  }

  getDaysInMonth() {
    return new Date(this.state.currentYear+1900, this.state.currentMonth+1, 0).getDate();
  }

  getStartDay() {
    return new Date(this.state.currentYear+1900, this.state.currentMonth, 1).getDay();
  }

  decreaseMonth() {
    var m = this.state.currentMonth;
    var y = this.state.currentYear;
    m = m-1
    if (m < 0) {
      m = 11;
      y = y-1;
    }
    this.setState({"currentYear": y, "currentMonth": m});
  }

  increaseMonth() {
    var m = this.state.currentMonth;
    var y = this.state.currentYear;
    m = m+1
    if (m > 11) {
      m = 0;
      y = y+1;
    }
    this.setState({"currentYear": y, "currentMonth": m});
  }

  render() {
    var rows = [];
    var days = this.getDaysInMonth();
    var startDate = this.getStartDay();
    for (var j=0; j<startDate; j++) {
      rows.push(<a key={100+j}><li className="notDay">.</li></a>);
    }
    for (var i=1; i<=days; i++) {
      rows.push(<CalendarDay key={i} data={{"month": this.state.currentMonth,
                                            "year": this.state.currentYear, 
                                            "day": i}}/>);
    }
    var totalDays = startDate + days;
    if (totalDays > 35) totalDays-=7;
    for (var k=0; k<35-totalDays; k++){
      rows.push(<a key={200+k}><li className="notDay">.</li></a>);
    }

    return (
      <div>
        <link href="css/calendar.css" rel="stylesheet"/>
        <div className="col-md-1"></div>
        <div className="col-md-10 col-sm-12" id="changing-data">
          <div className="row">
            <div className="col-md-1 visible-md visible-lg"></div>
            <div className="col-sm-12 col-md-10">
              <div className="row">
                <div className="col-md-2 visible-md visible-lg"></div>
                <div className="col-sm-12 col-md-8">
                  <div className="panel panel-default" id="calendar-panel">
                    <div className="panel-body">
                      <div className="row" >
                        <div className="col-xs-2" onClick={() => {this.decreaseMonth()}} >
                          <h1><span className="glyphicon glyphicon-menu-left pull-right cal-arrow"></span></h1>
                        </div>
                        <div className="col-xs-8">
                          <h1 className="month">{ this.getMonthName(this.state.currentMonth) }</h1>
                        </div>
                        <div className="col-xs-2" onClick={() =>{this.increaseMonth()}} >
                          <h1><span className="glyphicon glyphicon-menu-right cal-arrow"></span></h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12">
                          <ul className="cal" id="weekdays">
                            <li>Sun</li>
                            <li>Mon</li>
                            <li>Tue</li>
                            <li>Wed</li>
                            <li>Thu</li>
                            <li>Fri</li>
                            <li>Sat</li>
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <ul className="cal" id="days">
                            { rows }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1 visible-md visible-lg"></div>
          </div>
        </div>
      </div>
    )
  }
}