import React from 'react';
import { Link } from 'react-router';
import FoodItem from './fooditem';
import { getDayPanelData } from '../server';

export default class FoodPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      food: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this)
    getDayPanelData(nextProps.data.data.food, 'food', (food) => {
      this.setState({'food': []});
      this.setState({'food': food});
    })
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12">
                <h1>Diet
                </h1>
              </div>
              <div className="col-sm-12">
                <ul>
                  {this.state.food.map((food, index) => {
                    return (
                      <FoodItem key={index} data={food} deleteItem={(i,t) => {this.props.deleteItem(i,t)}} />
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