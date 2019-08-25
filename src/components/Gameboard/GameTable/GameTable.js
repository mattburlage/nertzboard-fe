import React, {Component} from 'react';
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Table from "reactstrap/es/Table";
import Badge from "reactstrap/es/Badge";

class GameTable extends Component {
    render() {
        let rounds = this.props.gameData;

        let gameRows = [];
        let upToDate = true;
        for (let i = 0; i < rounds.length; i++) {
            let behindInRounds = rounds[i].rounds < this.props.maxRounds;
            if (behindInRounds) upToDate = false;

            let newJsx = (
                <tr key={i} className={ behindInRounds ? 'bg-warning' : ''}>
                    <td>{i+1}</td>
                    <td>{rounds[i].name.split(' ')[0]}</td>
                    <td>{rounds[i].score}</td>
                </tr>
            );

            gameRows.push(newJsx)
        }

        let warningKey = (<div/>);
        if (!upToDate) {
            warningKey = (
                <Row className={'text-center'}>
                    <Col className={'text-center'}>
                        <p className={'text-center small'}><Badge className={'small'} color="warning" pill>&nbsp;</Badge>&nbsp;&nbsp;Awaiting submission for current round</p>
                    </Col>
                </Row>
            )
        }

        return (
            <div>
                <Row className='mt-5'>
                    <Col className={'d-none d-md-block'}/>
                    <Col xs={12} md={6}>
                        <Table className={(this.props.darkMode ? 'table-dark' : '' ) + ' table-striped'}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>
                            </thead>
                            <tbody>
                            {gameRows}
                            </tbody>
                        </Table>
                    </Col>
                    <Col className={'d-none d-md-block'}/>
                </Row>
                {warningKey}
            </div>
        );
    }
}

export default GameTable;