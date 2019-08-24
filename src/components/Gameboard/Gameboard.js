import React, {Component} from 'react';
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import FormGroup from "reactstrap/es/FormGroup";
import Form from "reactstrap/es/Form";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";


class Gameboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            nertz: 0,
        }
    }


    render() {
        return (
            <Container className='mt-3'>
                <Row>
                    <Col sm={12}>
                        <h4>Game # 45</h4>
                        <h6>Room: Ivins</h6>
                    </Col>
                </Row>
                <Row>
                    <Form>

                    </Form>
                </Row>
            </Container>
        );
    }
}

export default Gameboard;