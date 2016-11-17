import React from 'react';
import { Link } from 'react-router';

export default class CalendarDay extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      key: props.data
    }
  }

  render() {
    return (
      <li>
        { this.state.key }
      </li>
    )
  }
}