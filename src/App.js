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
            has_key: !!localStorage.getItem('token'),
            loginError: null,
            username: '',
            userData: {},
        };
        this.handleDarkModeToggle = this.handleDarkModeToggle.bind(this);
        this.handle_login = this.handle_login.bind(this);
        this.handle_signup = this.handle_signup.bind(this);
    }

    componentDidMount() {
        if (this.state.has_key) {
            fetch('http://localhost:8000/nertz/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .catch(res => {
                    this.setState({
                        loginError: res.status + ' ' + res.statusText,
                    })
                })
                .then(res => res.json())
                .then(json => {
                    if (!json.details && !json.non_field_errors) {
                        this.setState({
                            username: json.username,
                        });
                    } else if(json.details) {
                        this.setState({
                            loginError: json.details,
                        })
                    } else if (json.non_field_errors) {
                        this.setState({
                            loginError: json.non_field_errors,
                        })
                    }
                })
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
            .catch(res => {
                this.setState({
                    loginError: res.status + ' ' + res.statusText,
                })
            })
            .then(res => res.json())
            .then(json => {
                if (!json.details && !json.non_field_errors) {
                    localStorage.setItem('token', json.token);
                    this.setState({
                        has_key: !!localStorage.getItem('token'),
                        displayed_form: '',
                        username: json.user.username,
                        userData: json.user,
                    });
                } else if(json.details) {
                    this.setState({
                        loginError: json.details,
                    })
                } else if (json.non_field_errors) {
                    this.setState({
                        loginError: json.non_field_errors,
                    })
                }
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
                    has_key: !!localStorage.getItem('token'),
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ has_key: !!localStorage.getItem('token'), username: '' });
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
        if (!this.state.has_key || !this.state.username) {
            defaultRoute = (props) => <LoginForm handleLogin={this.handle_login}
                                                 loginError={this.state.loginError}
                                                 {...props} isAuthed={true} />
        }
        return (
            <div className="App">
                <Helmet >
                    <title>NertzBoard</title>
                    <body className={this.state.darkMode ? 'color-mode-dark' : 'color-mode-light'} />
                </Helmet>
                <Header loggedIn={!!this.state.username}
                        username={this.state.username}
                        isAdmin={this.state.is_superuser}
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
