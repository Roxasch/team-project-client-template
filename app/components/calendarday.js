import React from 'react';
import { Link } from 'react-router';

export default class CalendarDay extends React.Component {

  constructor(props) {
    super(props);
    this.state=props.data
  }

  render() {
    return (
      <Link className="l" to={'/date/'+this.state.month+this.state.day+this.state.year} >
        <li className="day">
          { this.state.day }
        </li>
      </Link>
    )
  }
}