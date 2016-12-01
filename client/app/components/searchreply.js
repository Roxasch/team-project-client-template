import React from 'react';
import { Link } from 'react-router';

export default class SearchReply extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }

  displayItem() {
    if (this.state.fat !== undefined) 
      return (
        <div className="col-sm-6">
          <table>
            <tbody>
              <tr>
                <td>Fat:</td>
                <td>{ this.state.fat }</td>
              </tr>
              <tr>
                <td>Carbs:</td>
                <td>{ this.state.carbs }</td>
              </tr>
              <tr>
                <td>Protein:</td>
                <td>{ this.state.protein }</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
  }

  burnt() {
    if (this.state.fat === undefined) return ' Burned'
  }

  render() {
    return (
      <li>
        <a >
          <div className="row result"  onClick={() => {this.props.onPost(this.state._id,this.state.type)}}>
            <div className="col-sm-12">
              <div className="media">
                <div className="media-left">
                  { this.state.name }
                </div>
                <div className="media-body">
                  <div className="col-sm-6">
                    <table>
                      <tbody>
                        <tr>
                          <td>Calories{ this.burnt() }:</td>
                          <td>{ this.state.calories }</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  { this.displayItem() }
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    )
  }
}
