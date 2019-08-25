import React, {Component} from 'react';
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";

class GameInfo extends Component {
    render() {
        return (
            <Row>
                <Col sm={12}>
                    <h4>Game # {this.props.roomData.game}</h4>
                    <h6>Room: {this.props.roomData.name}</h6>
                    <h6>Round: {this.props.roomData.curround}</h6>
                </Col>
            </Row>
        );
    }
}

export default GameInfo;