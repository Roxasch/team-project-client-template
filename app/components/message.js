import React from 'react';
import { Link } from 'react-router';
import { getUsername } from '../server'

export default class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }

  componentDidMount() {
    getUsername(this.state.author, (username) => {
        this.setState({username: username});
    });
  }

  render() {
    return (
      <div className="col-sm-4">
        <div className="panel message">
          <div className="panel-body">
            {this.state.contents}
          </div>
          <div className="panel-footer">
            <div className="media-left">
              <img src="img/blank-profile.png" width="20px"/>
            </div>
            <div className="media-body">
              {this.state.username}
            </div>
          </div>
        </div>
      </div>
    )
  }
}