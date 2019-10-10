import React, { Component } from "react";
import Chart from "react-apexcharts";

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
		  id: "basic-bar",
		  animations: {
			enabled: true,
			easing: 'easeinout',
			speed: 800,
			animateGradually: {
				enabled: true,
				delay: 150
			},
			dynamicAnimation: {
				enabled: true,
				speed: 350
			}
			}
        },
        xaxis: {
          categories: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }
	Rand = () => {
		let temp = this.state.series[0]
		var int = getRandomInt(10)
		console.log(int)
		this.setState({temp:int})
	}


  componentDidMount = () => {
	  setInterval(()=>{this.Rand()},1000)
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}