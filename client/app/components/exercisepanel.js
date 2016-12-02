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
    getDayPanelData(nextProps.data.data.exercise, 'exercise', (exer) => {
      this.setState({'exercise': []})
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
                  {this.state.exercise.map((exer, index) => {
                    return (
                      <ExerciseItem key={index} data={exer} deleteItem={(i,t) => {this.props.deleteItem(i,t)}} />
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