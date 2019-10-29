import React from 'react';
import axios from 'axios';

export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      data:[]
    }
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = () => {
    axios.get('http://localhost:5004/api/getData')
    .then(async (res)=>{
        let list = await res.data
        let add = await list.map((x)=>{return x.message})
        this.setState({data:add})
        //await console.log(loop)
    })
    .catch((err)=>{
      console.log("Connection Refuse By Detail : " + err)
    })
  }
  deleteData = () => {
    axios.get()
  }

  render(){
    const { data } = this.state
    console.log(data)
    return(
      <div>
        {data.map((showData)=>
          <li key = { showData }>{showData}</li>
        )}

        <button onClick = {this.getData}>
          Click to show data
        </button>
      </div>
    )
  }
}