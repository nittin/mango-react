import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';

import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './about.css';

class About extends Component {
    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Amount',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        return (
            <Container className="about">
                <div className="py-3">
                    <Bar
                        data={data}
                        width={100}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <div className="py-3">
                    <Line
                        data={data}
                        width={100}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <Row className="pt-3">
                    <Col className="mx-3">
                        <Card>
                            <CardImg top width="100%" src={this.props.location.state.info.img}/>
                            <CardBody>
                                <CardTitle>{this.props.location.state.info.name}</CardTitle>
                                <CardSubtitle>{this.props.location.state.info.des}</CardSubtitle>
                                <CardText>{this.props.location.state.info.content}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default About;
