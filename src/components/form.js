/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitBuyOrder, submitSellOrder } from '../actions/userActions';
import '../styles/form.css';

// This is a form component with 2 buttons and 2 inputs 
// for simplicity it is not composed of children as this would 
// require to pass click function from it to its children buttons
// and use Redux for the state of the inputs. 
// When the button buy or sell is clicked the order data are 
// posted on the Market Data 
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { size: '', price: '' };
    this.handleOrderSizeChange = this.handleOrderSizeChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleButtonClick(buttonPressed) {
    if (buttonPressed === 'sell') {
      this.props.dispatch(submitSellOrder(this.state));
    }
    if (buttonPressed === 'buy') {
      this.props.dispatch(submitBuyOrder(this.state));
    }
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleOrderSizeChange(size) {
    this.setState({ size: size.target.value });
  }
  handlePriceChange(price) {
    this.setState({ price: price.target.value });
  }
  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <button
          className="btn--buy"
          onClick={() => this.handleButtonClick('buy')}
        >
          Buy
        </button>
        <input
          type="text"
          placeholder="Order Size"
          value={this.state.size}
          onChange={this.handleOrderSizeChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Price"
          value={this.state.price}
          onChange={this.handlePriceChange}
          className="input"
        />
        <button
          className="btn--sell"
          onClick={() => this.handleButtonClick('sell')}
        >Sell
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Form);
