/*import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints1 = [];
var dataPoints2 = [];
var updateInterval = 2000;
//initial values
var yValue1 = 408;
var yValue2 = 350;
var xValue = 5;
export default class Graph extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);		
	}
	componentDidMount(){
		this.updateChart(20);
		setInterval(this.updateChart, updateInterval);
	}
	
	updateChart(count) {
		count = count || 1;		
		for (var i = 0; i < count; i++) {
			xValue += 2;
			yValue1 = Math.floor(Math.random()*(408-400+1)+400);
			yValue2 = Math.floor(Math.random()*(350-340+1)+340);
			dataPoints1.push({
			  x: xValue,
			  y: yValue1
			});
			dataPoints2.push({
			  x: xValue,
			  y: yValue2
			});
		}
		this.chart.options.data[0].legendText = " Bugatti Veyron - " + yValue1 + " km/h";
		this.chart.options.data[1].legendText = " Lamborghini Aventador - " + yValue2 + " km/h";
		this.chart.render();
	}
	render() {
		const options = {
			zoomEnabled: true,
			theme: "light2",
			title: {
				text: "Speed of Bugatti vs Lamborghini"
			},
			axisX: {
				title: "chart updates every 2 secs"
			},
			axisY:{
				suffix: " km/h",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
				itemclick : function(e){
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else {
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
			},
			data: [
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Bugatti Veyron",
					dataPoints: dataPoints1
				},
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Lamborghini Aventador" ,
					dataPoints: dataPoints2
				}
			]
		}
		
		return (
		<div>
			<h1>React Dynamic Multi Series Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{}
		</div>
		);
	}
}*/

import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Chart from "react-apexcharts";

class Graph extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      message: [],
	  endpoint: "http://localhost:3003", // เชื่อมต่อไปยัง url ของ realtime server
	  
	  options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
        }
      },
      series: [
        {
          name: "Temp",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  }

  componentDidMount = () => {
    this.response()
  }

  // เมื่อมีการส่งข้อมูลไปยัง server
  send = (message) => {
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    socket.emit('sent-message', input)

	//pop เมื่อ Data มา
	this.state.series[0].data.push(input);
	//shift Array ทิ้งใน index[0] ไล่ซ้าย
	this.state.series[0].data.shift()
  }

  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      temp.push(messageNew)
      this.setState({ message: temp })
    })
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }

  render() {
	const { input, message } = this.state  
	  
    return (
      <div>
        <div style={style}>
          <input value={input} onChange={this.changeInput} />
          <button onClick={() => this.send()}>Send</button>
        </div>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {i + 1} : {data}
            </div>
          )
		}
		<Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="500"
        />
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default Graph