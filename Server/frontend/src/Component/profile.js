import React, { Component } from 'react';
import nbimage from '../Image/nb.png'
export default class Home extends Component {
    /*constructor(){
        super()

    }*/
   
    render(){
        return (
        <div>
            <img src={nbimage} alt="nb" />
        </div>
        )
    }
}