import React from 'react';
import { Link } from 'react-router';

export default class ExerciseItem extends React.Component {

  render() {
    return (
      <li>
        <div className="row">
          <a href="#" className="col-sm-12 data">
            <div className="media">
              <div className="media-left">
                Name of exercise
              </div>
              <div className="media-body">
                Some information about the exercise
              </div>
              <div className="media-right">
                <span className="glyphicon glyphicon-option-vertical"></span>
              </div>
            </div>
          </a>
        </div>
      </li>
    )
  }
}