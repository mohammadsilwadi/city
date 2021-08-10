import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div>
        
                <h2>{this.props.description}</h2>
                <h2>{this.props.data}</h2>
                
            </div>
        )
    }
}

export default Weather
