import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMarketData } from '../actions/domainActions';
import Form from './form';
import List from './list';
import '../styles/app.css';

// The App Component has as children the Form and List Children
// both of which have no children. 
class App extends Component { 
  constructor(props) {
    super(props);
    this.state = { width: null };
  }
  componentDidMount() {
    // We retrieve the app width to set it as the width of our header in the render method
    const appWidth = document.querySelector('.App').getBoundingClientRect().width;
    this.setState({ width: appWidth });
    // we dispatch the fectchMarketData action which will retrieve the order book data
    this.props.dispatch(fetchMarketData());
    // every two seconds fetch new Market data
    setInterval(() => {
      this.props.dispatch(fetchMarketData());
    }, 2000);
  }
  render() {
    return (
      <div className="App ">
        <div className="App__header" style={{ width: this.state.width }}>
          <h1>ORDER BOOK</h1>
          <Form />
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
// I chose to avoid the boilerplate of the function
// mapDispatchToProps
export default connect()(App);
