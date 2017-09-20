import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMarketData } from '../actions/domainActions';
import List from './list';
import '../app.css';


class App extends Component { 
  constructor(props) {
    super(props);
    this.state = { width: null };
  }
  componentDidMount() {
    const appWidth = document.querySelector('.App').getBoundingClientRect().width;
    this.setState({ width: appWidth });
    this.props.dispatch(fetchMarketData());
    // setInterval(() => {
    //   this.props.dispatch(fetchMarketData());
    // }, 2000);
  }
  render() {
    return (
      <div className="App ">
        <div className="App__header" style={{ width: this.state.width }}>
          <h1>ORDER BOOK</h1>
          <div className="App__legend row">
            <h4>Market Size</h4>
            <h4>Price (USD)</h4>
          </div>
        </div>
        <List />
      </div>
    );
  }
}

export default connect()(App);
