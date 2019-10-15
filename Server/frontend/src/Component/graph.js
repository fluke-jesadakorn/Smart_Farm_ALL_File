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
		  id: "line",
		  animations: {
			enabled: true,
			easing: 'easeinout',
			speed: 1500,
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
          name: "temp",
          data: []
        }
      ]
    };
  }

	rand = () => {
		var int = getRandomInt(10)
		var int2 = getRandomInt(10)
		var int3 = getRandomInt(10)
		var int4 = getRandomInt(10)
		var int5 = getRandomInt(10)
		var int6 = getRandomInt(10)
		var int7 = getRandomInt(10)
		var int8 = getRandomInt(10)
		var int9 = getRandomInt(10)
		var int10 = getRandomInt(10)
		var arr = [int,int2,int3,int4,int5,int6,int7,int8,int9,int10]
		this.setState({series:[{data:arr}]})
	}

	componentDidMount = () => {
		this.interval = setInterval(()=>{this.rand()},1000)
	}

	render() {
		return (
			<div className="app">
			<div className="row">
			<div className="mixed-chart">
			<Chart
				options={this.state.options}
				series={this.state.series}
				type="line"
				width="500"
			/>
			</div>
			</div>
			</div>
			);
		}
	}