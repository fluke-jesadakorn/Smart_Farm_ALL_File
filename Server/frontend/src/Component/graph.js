import React, { Component } from "react";
import Chart from "react-apexcharts";

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

export default class App extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			temp : [],
      		options: {
        	chart: {
			id: "line",
			animations: {
				enabled: true,
				easing: 'linear',
				speed: 50,
				animateGradually: {
					enabled: true,
					delay: 100
				},
				dynamicAnimation: {
					enabled: false,
					speed: 500
				}
			}
        },
        xaxis: {
          categories: []
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

add = () => {
	let temp = this.state.series[0].data
	let num = getRandomInt(10)
	if(temp.length > 9){
		let shift = temp.shift()
		this.setState({series:[{data:shift}]})
	}
	let concat = temp.concat(num)
	this.setState({series:[{data:concat}]})
	//console.log(temp)
}

componentDidMount = () => {
	this.interval = setInterval(()=>{this.add()},1000)
}

render() {
	return (
		<div>
		<Chart
			options={this.state.options}
			series={this.state.series}
			type="line"
			width="500"
		/>
		</div>
		);
	}
}