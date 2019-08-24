import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
        <Header />
      {/*</header>*/}
    </div>
  );
}

export default App;
