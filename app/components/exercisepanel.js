import React from 'react';
import { Link } from 'react-router';
import ExerciseItem from './exerciseitem';
import { getDayPanelData } from '../server';

export default class ExercisePanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      exercise: []
    }
  }

 
  componentWillReceiveProps(nextProps) {
    getDayPanelData(nextProps.data.food, 'exercise', (exer) => {
      this.setState({'exercise': exer});
    })
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <h1>Exercise
                </h1>
              </div>
              <div className="col-sm-12">
                <ul>
                  {this.state.exercise.map((exer) => {
                    return (
                      <ExerciseItem key={exer} data={exer} />
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}