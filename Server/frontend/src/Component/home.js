import React from 'react';
import axios from 'axios';

export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      data:[]
    }
    this.addData = this.addData.bind(this)
  }

  componentDidMount = () => {
    this.interval = setInterval(()=>this.getData(),1000)
  }

  getData = () => {
    axios.get('http://localhost:5004/api/getData')
    .then(async (res)=>{
      let fromGetData = res.data
      let datas = fromGetData.map((data)=>{ return data })
      this.setState({data:datas})
      await console.log(datas)
    })
  }

  addData = async () => {
    await axios.post("http://localhost:5004/api/addData", { data:"MyNew" })
  }
  listIndex = async (indexId) => {
    
  }

  deleteData = async (index) => {
    let listId = await this.state.data.map((Id)=>{return Id.id})
    await console.log(listId)
    await console.log(index)
    axios.delete("http://localhost:5004/api/deleteData", { data : { params : listId[index] } })
    .catch((err)=>{
      console.log("Not Found Index : " + err)
    })
    console.log("Your sent delete data index : " + index)
  }

  render(){
    let { data } = this.state
    //console.log(data)
    return(
      <div>
        <div>
        {data.map((showData,index)=>
          <li key = { index } > {index+1} . { showData.data }
          <button onClick = {()=>{this.deleteData(index)}}> Delete </button>
          </li>
        )}
        </div>

        <button onClick = {()=>{this.getData()}}>
          Click to show data
        </button>

        <h3>Add Data</h3>

        <button onClick = {()=>{this.addData()}} >Add</button>
      </div>
    )
  }
}