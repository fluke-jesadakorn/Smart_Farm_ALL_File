import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Chart from "react-apexcharts";

class Graph extends Component {
  constructor() {
    super()
    this.state = {
		//for SocketIO
      	input: '',
		message: [],
		endpoint: "http://localhost:3003", // เชื่อมต่อไปยัง url ของ realtime server
		
		//for ApexChart
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
		],

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
	//push เมื่อ Data มา จาก index สุดท้าย
	this.state.series[0].data.push(input);
	//shift Array ทิ้งใน index[0] ไล่ซ้าย
	this.state.series[0].data.shift()
	console.log("Pushed and Poped data")
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
      <div style={style}>
		<Chart
			options={this.state.options}
			series={this.state.series}
			type="line"
			width="500"
        />
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
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default Graph