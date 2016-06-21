import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'


const Home = React.createClass({
  render() {
    return (
      <h1>Home</h1>
    )
  }
})

const About = React.createClass({
  render() {
    return (
      <h1>About</h1>
    )
  }  
})

const Contact = React.createClass({
  render() {
    return (
      <h1>Contact</h1>
    )
  }
})

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
  </Router>
), document.getElementById('container'))