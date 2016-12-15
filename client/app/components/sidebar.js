
import React from 'react';
import { Link } from 'react-router';
import { getDayData, getDayPanelData } from '../server';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.params === undefined || this.props.params.date === undefined) {
      var currentDate = (new Date().getMonth())*100000
                       +(new Date().getDate())*1000
                       +(new Date().getYear());
    } else {
      currentDate = this.props.params.date;
    }

    var ds = this.calcDate(currentDate);

    this.dailyInfo(currentDate);

    this.state = {
      "date": currentDate,
      "dateString": ds,
      "data": {
        "food":[],
        "exercise": []
      },
      "dayInfo": {
        "consumedCal": 0,
        "burntCal": 0,
        "fat": 0,
        "carbs": 0,
        "protein": 0,
        "netCal": 0
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data === undefined || nextProps.data.date === undefined) {
      var currentDate = (new Date().getMonth())*100000
                       +(new Date().getDate())*1000
                       +(new Date().getYear());
      var ds = this.calcDate(currentDate);

      this.setState({'dateString': ds})
    } else {
      currentDate = nextProps.data.date;
      this.setState(nextProps.data, () => {
        var ds = this.calcDate(currentDate);
        this.setState({'dateString': ds});
        this.calcDayInfo()});
    }

  }

  calcDate(date) {
    var m = parseInt(date/100000);
    var d = parseInt(date/1000) - m*100;
    return m+1 + '/' + d
  }

  dailyInfo(date) {
    getDayData("000000000000000000000001", ("000000000000000000000000" + date).slice(-24), (data) => {
      this.setState({'data': data}, () =>
        this.calcDayInfo())
    });
  }

  calcDayInfo() {
    getDayPanelData(this.state.data.food, 'food', (food) => {
      var conCal = 0;
      var fat = 0;
      var carbs = 0;
      var protein = 0;
      for (var f in food){
        conCal += food[f].calories
        fat += food[f].fat
        carbs += food[f].carbs
        protein += food[f].protein
      }
      var currDayInfo = this.state.dayInfo;
      currDayInfo.consumedCal = conCal;
      currDayInfo.fat = fat.toFixed(1);
      currDayInfo.carbs = carbs.toFixed(1);
      currDayInfo.protein = protein.toFixed(1);
      this.setState({'dayInfo': currDayInfo});
    })
    getDayPanelData(this.state.data.exercise, 'exercise', (exer) => {
      var burntCal = 0;
      for (var f in exer){
        burntCal += exer[f].calories
      }
      var currDayInfo = this.state.dayInfo;
      currDayInfo.burntCal = burntCal;
      currDayInfo.netCal = currDayInfo.consumedCal - burntCal;
      this.setState({'dayInfo': currDayInfo});
    })
  }

  render() {
    return (
      <div className="col-xs-12 col-md-2 col-sm-3" id="stats">
        <div className="row">
          <div className="col-sm-12">
            <h1>{ this.state.dateString }</h1>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <table className="dailyStats">
              <tbody>
                <tr>
                  <td>Total Consumed Calories: </td>
                  <td>{ this.state.dayInfo.consumedCal }</td>
                </tr>
                <tr>
                  <td>Total Calories Burnt: </td>
                  <td>{ this.state.dayInfo.burntCal }</td>
                </tr>
                <tr>
                  <td>Net Calories: </td>
                  <td>{ this.state.dayInfo.netCal }</td>
                </tr>
                <tr>
                  <td>Total Fat: </td>
                  <td>{ this.state.dayInfo.fat }</td>
                </tr>
                <tr>
                  <td>Total Carbs: </td>
                  <td>{ this.state.dayInfo.carbs }</td>
                </tr>
                <tr>
                  <td>Total Protein: </td>
                  <td>{ this.state.dayInfo.protein }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}