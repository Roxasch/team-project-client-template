import React from 'react';
import { Link } from 'react-router';

export default class FoodItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render() {
    return (
      <li>
        <div className="row">
          <div className="col-sm-12 data">
            <div className="media">
              <div className="media-left">
                { this.state.name }
              </div>
              <div className="media-body">
                <div className="col-sm-6">
                  <table>
                    <tbody>
                      <tr>
                        <td>Calories:</td>
                        <td>{ this.state.calories }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              </div>
              <div className="media-right">
                <a onClick={() => {this.props.deleteItem(this.state._id, this.state.type)}} >
                  <span className="glyphicon glyphicon-remove"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}