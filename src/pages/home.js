import React, {Component} from 'react';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './home.css';


class Home extends Component {
    render() {
        const cards = [
            {
                id: 0,
                img: 'assets/home-card-bg.jpg',
                name: 'Card title 1',
                content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
                des: 'Card subtitle'
            },
            {
                id: 1,
                img: 'assets//home-card-bg2.jpg',
                name: 'Card title',
                content: 'Hello quick example text to build on the card title and make up of the card\'s content.',
                des: 'Card 2 subtitle'
            },
            {
                id: 2,
                img: 'assets//home-card-bg3.jpg',
                name: 'Card title',
                content: 'Hello quick example text to build on the card title and make up of the card\'s content.',
                des: 'Card 2 subtitle'
            },
            {
                id: 3,
                img: 'assets//home-card-bg4.jpg',
                name: 'Card title',
                content: 'Hello quick example text to build on the card title and make up of the card\'s content.',
                des: 'Card 2 subtitle',
                sub: true
            },
        ];

        return (
            <div className="home">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Mango</h1>
                    <Button outline color="light">Learn more</Button>
                </header>
                <Container>
                    <Row className="pt-3">
                        {cards.map((i, index) =>
                            <Col key={index} xs="12" sm="6" md="3">
                                <Card>
                                    <CardImg top width="100%" src={i.img}/>
                                    <CardBody >
                                        <CardTitle>{i.name}</CardTitle>
                                        <CardSubtitle >{i.des}</CardSubtitle>
                                        <CardText>{i.content}</CardText>
                                        <Link to={{pathname: 'about/' + i.id, state: {info: i}}}>
                                            <Button outline={i.sub}>Get now</Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;
