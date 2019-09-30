import React, { Component, ReactDOM } from 'react'
import socketIOClient from 'socket.io-client'
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts"

/*class Graph extends Component {
  constructor(props) {
	super(props)
    this.state = {
		//for SocketIO
      	input: '',
		message: [],
		endpoint: "61.19.181.29:3003", // เชื่อมต่อไปยัง url ของ realtime server
		
		//for ApexChart
		options: {
			chart: {
				id: 'realtime',
				animations: {
				  enabled: true,
				  easing: 'linear',
				  dynamicAnimation: {
					speed: 1000
				  }
				},
				toolbar: {
				  show: false
				},
				zoom: {
				  enabled: false
				}
			  },
			  dataLabels: {
				enabled: false
			  },
			  stroke: {
				curve: 'smooth'
			  },
	
			  title: {
				text: 'Dynamic Updating Chart',
				align: 'left'
			  },
			  markers: {
				size: 0
			  },
			  xaxis: {
				type: 'datetime',
				range: 'XAXISRANGE',
			  },
			  yaxis: {
				max: 100
			  },
			  legend: {
				show: false
			  }
		  },
		  series: [{
			data: data.slice()
		  }],
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
	//เอาไว้ใส่ Debug
	this.setState({input:''})
	console.log("Pushed and Poped data")
  }

  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
	const { endpoint } = this.state
	var { data } = this.state.series
    var temp = data
    const socket = socketIOClient(endpoint)
    socket.on('nb', (messageNew) => {
		//push เมื่อ Data มา
		temp.push(messageNew)
		//แสดงผลไม่เกิน 10 ตัว
		if(data.length > 10){
			//shift Array ทิ้งใน index[0] ไล่ซ้าย
			data.shift()
		}
		this.setState({data : temp})
    })
  }

  render() {
	var { data } = this.state.series[0]
	console.log(data)
	  
    return (
      <div>
		<Chart
			options={this.state.options}
			series={this.state.series}
			type="line"
			width="500"
        />
		{data}
      </div>
    )
  }
}
export default Graph*/
var lastDate = 0;
var data = []
var y
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
function getDayWiseTimeSeries(baseval, count, yrange) {
	var i = 0;
	while (i < count) {
		var x = baseval;
		//var y //= Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

		data.push({
			x, y
		});
		lastDate = baseval
		baseval += TICKINTERVAL;
		i++;
	}
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
	min: 10,
	max: 90
})

function getNewSeries(baseval, yrange) {
	var newDate = baseval + TICKINTERVAL;
	lastDate = newDate

	for(var i = 0; i< data.length - 10; i++) {
		// IMPORTANT
		// we reset the x and y of the data which is out of drawing area
		// to prevent memory leaks
		data[i].x = newDate - XAXISRANGE - TICKINTERVAL
		data[i].y = 0
	}
	
	data.push({
		x: newDate,
		//y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
	})
	
}

function resetData(){
	// Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
	data = data.slice(data.length - 10, data.length);
}

export default class LineChart extends React.Component {

constructor(props) {
  super(props);

  this.state = {
	endpoint: "61.19.181.29:3003",
	options: {
	  chart: {
		  id: 'realtime',
		  animations: {
			enabled: true,
			easing: 'linear',
			dynamicAnimation: {
			  speed: 1000
			}
		  },
		  toolbar: {
			show: false
		  },
		  zoom: {
			enabled: false
		  }
		},
		dataLabels: {
		  enabled: false
		},
		stroke: {
		  curve: 'smooth'
		},

		title: {
		  text: 'Dynamic Updating Chart',
		  align: 'left'
		},
		markers: {
		  size: 0
		},
		xaxis: {
		  type: 'datetime',
		  range: XAXISRANGE,
		},
		yaxis: {
		  max: 100
		},
		legend: {
		  show: false
		}
	},
	series: [{
	  data: data.slice()
	}],
  }
}

componentDidMount() {
  this.intervals()
  this.response()
}

response = () => {
	const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('nb', (messageNew) => {
		//push เมื่อ Data มา
		data.push({x: "" ,y : messageNew})
		//แสดงผลไม่เกิน 10 ตัว
		/*if(data.length > 10){
			//shift Array ทิ้งใน index[0] ไล่ซ้าย
			data.shift()
		}*/
    })
  }

intervals () {
  window.setInterval(() => {
	getNewSeries(lastDate, {
	  min: 10,
	  max: 90
	})
	
	ApexCharts.exec('realtime', 'updateSeries', [{
	  data: data
	}])
  }, 1000)
}

render() {
  return (
	  <div id="chart">
		<ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
	  </div>
  );
}
}