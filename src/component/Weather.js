import React, { Component } from 'react'
import { Container,Row,Col, } from 'react-bootstrap'

export class Weather extends Component {

  render() {
    return (
      <div>
        
        <Container>
               
            
                <Row>
                  <Col xs={6} md={4}>
                
                <h2>{this.props.data}</h2>
                <h2>{this.props.description}</h2>
                <br/>
                  </Col>
                  </Row>
                     
                  </Container>
        
      </div>
    )
  }
}

export default Weather
