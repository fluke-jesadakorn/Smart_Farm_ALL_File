import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';

//css with styled component
const Button = styled.div`
margin-top:100px;
width: 50px;
`
export default class Control extends Component {
    constructor(){
        super()
        this.state = {
            sw1:false,
        }
    }
    
    sendswitch = () => {
        const { sw1 } = this.state
        axios.post('http://localhost:3001/api/button/', {
            command : !sw1
        })
    }
    
    render(){

        return (
            <Button>
            <button onClick={()=>{this.sendswitch()}}>switchbt</button>
            </Button>
        )
    }
}