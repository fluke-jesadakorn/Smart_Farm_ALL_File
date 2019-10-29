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
    this.deleteData()
    this.addData()
  }

  getData = () => {
    axios.get('http://localhost:5004/api/getData')
    .then(async (res)=>{
        let list = await res.data
        let add = await list.map((x)=>{ return x.message })
        this.setState({ data : add })
        //await console.log("Your data is : " + loop)
    })
    .catch((err)=>{
      console.log("Connection Refuse By Detail : " + err)
    })
  }
  addData = () => {
    axios.get("http://localhost:5004/api/getData")
    .then((res)=>{
      console.log()
    })
  }
  deleteData = async (index) => {
      axios.delete("http://localhost:5004/api/deleteData", { data : { params : index } })
      .catch((err)=>{
        console.log("Not Found Index : " + err)
      })
      console.log("Your sent delete data index : " + index)
  }

  render(){
    const { data } = this.state
    console.log(data)
    return(
      <div>
        {data.map((showData, index)=>
          <li key = { showData }>{ showData }
          <button onClick = {()=>{ this.deleteData(index) }}> Delete </button>
          </li>
        )}

        <button onClick = {this.getData}>
          Click to show data
        </button>
      </div>
    )
  }
}