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
        axios.post('http://localhost:7000', {
            data : "hello",
            my : "world"
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