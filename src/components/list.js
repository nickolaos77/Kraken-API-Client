import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class List extends Component { 
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems() {
    // when data become available show them
    if ( this.props.marketData.data.asks) {
      const asks = this.props.marketData.data.asks.map((marketItem, index) => (
        <div className="row" key={index.toString()}>
          <p >{marketItem[1]}</p>
          <p className="ask">{this.props.marketData.data.asks[index][0]}</p>
        </div>
      )
      );
      const bids = this.props.marketData.data.bids.map((marketItem, index) => (
        <div className="row" key={`${index.toString()}b`}>
          <p >{marketItem[1]}</p>
          <p className="buy">{this.props.marketData.data.bids[index][0]}</p>
        </div>
      ),
      );
      return [...asks, ...bids];
    }
    return <p>fetching market data...</p>;
  }
  // in every state change the component will be rerendered and the function r
  render() {
    return (
      <div className="dataList">
        {this.renderListItems()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ marketData: state.marketData });

List.propTypes = {
  marketData: PropTypes.objectOf(PropTypes.shape),
};

List.defaultProps = {
  marketData: {},
};

export default connect(mapStateToProps)(List);
