import React from 'react'
import { Component } from 'react'
import ReactDOM from 'react-dom'
import './app.css'

export default class App extends Component {
    render() {
        return (
            <div>Text text text</div>
        );
    }
};

const mountNode = document.querySelector('#root');
ReactDOM.render(<App />, mountNode);