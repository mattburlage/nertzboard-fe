import React from 'react';

import {Helmet} from "react-helmet";
import Header from "./components/Header/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Gameboard from "./components/Gameboard/Gameboard";
import {Route, Switch} from "react-router";
import LoginForm from "./components/LoginForm/LoginForm";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: localStorage.getItem('nertz-dark') === 't',
            logged_in: !!localStorage.getItem('token'),
            username: '',
            userData: {},
        };
        this.handleDarkModeToggle = this.handleDarkModeToggle.bind(this);
        this.handle_login = this.handle_login.bind(this);
        this.handle_signup = this.handle_signup.bind(this);
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/nertz/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        username: json.username,
                    });
                });
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.user.username,
                    userData: json.user,
                });
                console.log(json);
                console.log(this.state);
            });


    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/nertz/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
    };

    handleDarkModeToggle() {
        if (this.state.darkMode) {
            localStorage.setItem('nertz-dark', 'f')
        } else {
            localStorage.setItem('nertz-dark', 't')
        }

        this.setState({
            darkMode: !this.state.darkMode,
        })
    }

    render() {
        let defaultRoute = (props) => <Gameboard darkMode={this.state.darkMode} {...props} isAuthed={true} />;
        if (!this.state.logged_in) {
            defaultRoute = (props) => <LoginForm handleLogin={this.handle_login} {...props} isAuthed={true} />
        }

        return (
            <div className="App">
                <Helmet >
                    <title>NertzBoard</title>
                    <body className={this.state.darkMode ? 'color-mode-dark' : 'color-mode-light'} />
                </Helmet>
                <Header loggedIn={this.state.logged_in}
                        username={this.state.username}
                        userData={this.state.userData}
                        darkMode={this.state.darkMode}
                        toggleDarkMode={this.handleDarkModeToggle}
                        handle_logout={this.handle_logout}
                />
                <BrowserRouter >
                    <Switch>
                        <Route path="/" render={defaultRoute} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;
