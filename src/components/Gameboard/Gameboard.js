import React, {Component} from 'react';
import Container from "reactstrap/es/Container";
import PointsForm from "./PointsForm/PointsForm";
import GameInfo from "./GameInfo/GameInfo";
import GameTable from "./GameTable/GameTable";
import Spinner from "reactstrap/es/Spinner";


class Gameboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            roomData: {},
            rounds: {},
        };
        this.updateScores = this.updateScores.bind(this);
    }

    componentDidMount() {
        this.updateScores()
    }

    updateScores() {
        fetch('http://localhost:8000/nertz/current_game_data/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    roomData: json.room_data,
                    rounds: json.rounds,
                    isLoaded: true,
                });
            });
    }

    render() {
        if (!this.state.isLoaded && false) {
            return (
                <div className={'mt-5 text-center'}><Spinner type={'grow'} color={'primary'} /><br/>Loading</div>
            )
        }

        return (
            <Container className='mt-3'>
                <GameInfo roomData={this.state.roomData}/>
                <PointsForm
                    handleUpdate={this.updateScores}
                />
                <GameTable gameData={this.state.rounds}
                           maxRounds={this.state.roomData.max_rounds}
                           darkMode={this.props.darkMode}
                           handleRefresh={this.updateScores}
                />
            </Container>
        );
    }
}

export default Gameboard;
