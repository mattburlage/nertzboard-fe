import React from 'react';

import {Helmet} from "react-helmet";
import Header from "./components/Header/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: localStorage.getItem('nertz-dark') === 't',
        };
        this.handleDarkModeToggle = this.handleDarkModeToggle.bind(this);
    }

    handleDarkModeToggle() {
        if (this.state.darkMode) {
            localStorage.setItem('nertz-dark', 'f')
        } else {
            localStorage.setItem('nertz-dark', 't')
        }

        this.setState({
            darkMode: localStorage.getItem('nertz-dark') === 't',
        })
    }

    render() {
        return (
            <div className="App">
                <Helmet >
                    <title>NertzBoard</title>
                    <body className={this.state.darkMode ? 'color-mode-dark' : 'color-mode-light'} />
                </Helmet>
                <Header darkMode={this.state.darkMode} toggleDarkMode={this.handleDarkModeToggle}/>
                <p>Test</p>
            </div>
        );
    }
}


export default App;
