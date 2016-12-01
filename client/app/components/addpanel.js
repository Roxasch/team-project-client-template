import React from 'react';
import { Link } from 'react-router';
import SearchReply from './searchreply';
import { getSearchData } from '../server';

export default class AddPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      items: []
    }
  }

  handleChange(e) {
    this.setState({'itemName': e.target.value}, function() {
      getSearchData(this.state.itemName, (results) => {
        this.setState({'items': results})
      })}
    );
  }

  componentDidMount() {
    getSearchData(this.state.itemName, (results) => {
      this.setState({'items': results})
    })
  }

  render() {
    return (
      <div>
        <div className="col-md-2 visible-md visible-lg"></div>
        <div className="col-sm-12 col-md-8">
          <div className="panel panel-default">
            <div className="panel-body">
            <div className="row">
              <div className="col-sm-4 col-xs-12 col-sm-push-8">
                <div className="input-group">
                  <input type="text" placeholder="Search"
                         onChange={(e) => this.handleChange(e)} />
                </div>
              </div>
              <div className="col-sm-8 col-xs-12 col-sm-pull-4">
                <ul>
                  {this.state.items.map((i) => {
                    return (
                      <SearchReply onPost={(a,t) => {this.props.onPost(a,t)}} key={i.name} data={i} />
                    )
                  })}
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}