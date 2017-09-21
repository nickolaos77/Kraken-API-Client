import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const List = (props) => {
  const renderListItems = () => {
    // when data become available show them
    if (props.appState.data.asks) {
      const asks = props.appState.data.asks.map((marketItem, index) => (
        <div className="row" key={index.toString()}>
          <p >{marketItem[1]}</p>
          <p className="ask">{props.appState.data.asks[index][0]}</p>
        </div>
      ),
      );
      const bids = props.appState.data.bids.map((marketItem, index) => (
        <div className="row" key={`${index.toString()}b`}>
          <p >{marketItem[1]}</p>
          <p className="buy">{props.appState.data.bids[index][0]}</p>
        </div>
      ),
      );
      return [...asks, ...bids];
    }
    return <p>fetching market data...</p>;
  };
  return (
    <div className="dataList">
      { renderListItems()}
    </div>
  );
};

const mapStateToProps = state => ({ appState: state.appState });

List.propTypes = {
  appState: PropTypes.objectOf(PropTypes.shape),
};

List.defaultProps = {
  appState: {},
};

export default connect(mapStateToProps)(List);
