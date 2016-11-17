import React from 'react';
import { Link } from 'react-router';

export default class Goals extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    const divStyle = {
      background: 'linear-gradient(to right, green, green ' + this.state.current + '%, red ' + this.state.current + '%, red)',
    };
    
    return (
      <div className="row">
        <div className="col-sm-12 progress" style={divStyle}>
          <p className="pull-left">Start: {this.state.start}</p>
          <p className="pull-right">Goal: {this.state.goal}</p>
        </div>
      </div>
    )
  }
}