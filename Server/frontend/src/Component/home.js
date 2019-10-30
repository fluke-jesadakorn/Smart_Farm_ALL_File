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
        let datas = await list.map((data)=>{ return data.message })
        this.setState({ data : datas })
        await console.log("Your data is : " + list)
    })
    .catch((err)=>{
      console.log("Connection Refuse By Detail : " + err)
    })
  }

  addData = async () => {
    await axios.post("http://localhost:5004/api/addData") 
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

        <h3>Add Data</h3>

        <button onClick = { this.addData }>Add</button>
      </div>
    )
  }
}