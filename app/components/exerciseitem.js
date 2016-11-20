import React from 'react';
import { Link } from 'react-router';

export default class ExerciseItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    return (
      <li>
        <div className="row">
          <a href="#">
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
                  <span className="glyphicon glyphicon-option-vertical"></span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </li>
    )
  }
}