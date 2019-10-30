import React from 'react';
import axios from 'axios';

export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      data:[],
      pages:{
        begin:0, stop:5
      }
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
    await axios.post("http://localhost:5004/api/addData", { data:"3" })
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

  editData = () => {
    return <h1>Hello</h1>
  }

  multipage = async (previous, next) => {
    var five = 5
    var preButton
    var nextButton
    if(previous && this.state.pages.begin != 0){
      preButton = this.state.pages.begin--
      nextButton = this.state.pages.stop--
    }
    if(next){ 
      previous = this.state.pages.begin++
      nextButton = this.state.pages.stop++
    }
    this.setState({begin : preButton, stop : nextButton})
    console.log(`previous: ${this.state.pages.begin} , next: ${this.state.pages.stop}`)
  }

  render(){
    let { data, pages } = this.state
    return(
      <div>
        <div>
        {data.slice(pages.begin, pages.stop).map((showData,index)=>
          <li key = { index } > {index + 1} . { showData.data }
          <button onClick = {()=>{this.deleteData(index)}}> Delete </button>
          <button onClick = {()=>{this.editData()} }> Edit </button>
          </li>
        )}
        <button onClick = {()=>{this.multipage(1,0)}}>Previous</button>
        <button onClick = {()=>{this.multipage(0,1)}}>next</button>      
        </div>

        {/*<button onClick = {()=>{this.getData()}}>
          Click to show data
        </button>*/}

        <h3>Add Data</h3>

        <button onClick = {()=>{this.addData()}} >Add</button>
      </div>
    )
  }
}