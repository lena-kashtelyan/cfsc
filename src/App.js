import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './3_spotlights.js'

class App extends Component {
  render() {
    return (
      <P5Wrapper sketch={sketch} />
    );
  }
}

export default App;
