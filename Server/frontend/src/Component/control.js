import React, { Component } from 'react';
import styled from 'styled-components'

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
    handleOnOff = (event) => {
        this.setState({sw1:true})
        console.log(this.state.sw1)
    }

    render(){

        return (
            <Button>
                <button onClick= {this.handleOnOff}> work </button>
            </Button>
        )
    }
}