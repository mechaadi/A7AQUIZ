import React, { Component } from 'react';
import {withGetScreen} from 'react-getscreen'
import App from './App';
import Mobile from './Mobile';
import Tablet from './Tablet';

class GetScreen extends Component {
  render() {
    if (this.props.isMobile()) return <Mobile/>;
    if (this.props.isTablet()) return <div>Tablet</div>;
    return <App/>;
  }
}

export default withGetScreen(GetScreen);