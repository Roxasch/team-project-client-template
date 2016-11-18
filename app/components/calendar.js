import React from 'react';
import { Link } from 'react-router';
import CalendarDay from './calendarday';

export default class Calendar extends React.Component {

  render() {
    var rows = [];
    for (var i=1; i<32; i++) {
      rows.push(<CalendarDay key={i} data={i}/>);
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
                <div className="col-sm-2">
                  <span className="glyphicon glyphicon-menu-left pull-right cal-arrow"></span>
                </div>
                <div className="col-sm-8">
                  <div className="panel panel-default" id="calendar-panel">
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <h1>Month</h1>
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-12">
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
                <div className="col-sm-2">
                  <span className="glyphicon glyphicon-menu-right cal-arrow"></span>
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