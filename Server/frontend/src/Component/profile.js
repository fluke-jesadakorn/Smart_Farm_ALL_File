import React, { Component } from 'react';
import axios from 'axios'
import nbimage from '../Image/nb.png'
export default class Home extends Component {
    constructor(){
        super()

    }
    componentDidMount(){

    }
    
    render(){
        return (
        <div>
            <img src={nbimage} alt="nb" />
        </div>
        )
    }
}