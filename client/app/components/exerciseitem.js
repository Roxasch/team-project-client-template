import React from 'react';
import { Link } from 'react-router';

export default class ExerciseItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    console.log(this)
    return (
      <li>
        <div className="row">
          <div className="col-sm-12 data">
            <div className="media">
              <div className="media-left">
                { this.state.name }
              </div>
              <div className="media-body">
                <div className="col-sm-12">
                  <table>
                    <tbody>
                      <tr>
                        <td>Calories Burnt:</td>
                        <td>{ this.state.calories }</td>
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