import React, { Component } from 'react';
import { connect } from 'react-redux'

import Scanner from '../components/Common/Scanner'
import FakePhone from '../FakePhone'
import { onScan } from '../reducers/loadingReducer'

class PhoneSelector extends Component {
  render() {
    const { url, onScan, persistor } = this.props

    // TODO - Comment for QR codes
    // if (url) {
      return (
        <FakePhone loadingPersistor={persistor} url={url}/>
      )
    // } else {
    //   return (
    //     <Scanner onScan={onScan} persistor={persistor}/>
    //   )
    // }
  }
}

const mapStateToProps = state => {
  return {
    url: state.url
  }
};

const mapDispatchToProps = {
  onScan
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneSelector);
