import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component { 
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems() {
    if (this.props.marketData && this.props.marketData.data && this.props.marketData.data.asks) {
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
      )
      );
      return [...asks, ...bids];
    }
    return <p>fetching users...</p>;
  }

  render() {
    return (
      <div className="dataList">
        {this.renderListItems()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    marketData: state.marketData,
  };
};

export default connect(mapStateToProps)(List);
