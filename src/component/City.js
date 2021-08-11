import React, { Component } from 'react'
import {Container,Row,Col,Image} from 'react-bootstrap'
export class City extends Component {
    render() {
        return (
          
                <Container>
               
            
                <Row>
                  <Col xs={6} md={4}>
                  <h2>{this.props.cityName}</h2>
                <h2>{this.props.lat}</h2>
                <h2>{this.props.lon}</h2>
                  </Col>
                  </Row>
                     
                  </Container>
        )
    }
}

export default City