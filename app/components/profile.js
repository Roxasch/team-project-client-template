import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Goals from './goals';
import Message from './message';
import { getProfilePage, postMessage } from '../server';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileData: {
        user: {
          username: ''
        },
        goals:[],
        messages: []
      },
      newMessage: ''
    }
  }

  refresh() {
    getProfilePage(1, (profileData) => {
      this.setState({profileData});
    });
  }

  handleChange(e,name) {
    this.setState({[name]: e.target.value});
  }

  postComment() {
    postMessage(1,this.state.newMessage, () => {
      this.refresh();
    });
  }

  handleKeyUp(e) {
    if (e.key == "Enter") {
      var comment = this.state.newMessage.trim();
      if (comment !== "") {
        this.postComment();
        this.setState({newMessage: ""});
      }
    }
  }

  componentDidMount() {
    getProfilePage(1, (profileData) => {
        this.setState({profileData});
    });
  }

  render() {

    return (
      <div>
        <Navbar/>
        <Sidebar/>
        <link href="css/profile.css" rel="stylesheet"/>
        <div className="col-xs-12 col-md-2 col-sm-3"></div>
        <div className="col-md-10 col-sm-9" id="changing-data">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-sm-12 col-md-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="media">
                    <div className="media-left">
                      <img className="profile-image" src="img/blank-profile.png"/>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <h1>{this.state.profileData.user.username}</h1>
                        </div>
                      </div>
                      <hr/>
                      Some type of stats<br/>
                      <hr/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <h3>Goals:</h3>
                    {this.state.profileData.goals.map((goal) => {
                      return (
                        <Goals key={goal._id} data={goal}/>
                      )
                    })}
                  </div>
                </div>
                <div className="panel-footer">
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="text" 
                             placeholder="leave a message" 
                             onChange={(e) => this.handleChange(e,'newMessage')} 
                             onKeyUp={(e) => this.handleKeyUp(e)} />
                    </div>
                  </div>
                </div>
              </div>
              {this.state.profileData.messages.map((message) => {
                return (
                  <Message key={message._id} data={message}/>
                )
              })}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    )
  }
}