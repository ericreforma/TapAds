import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import { connect } from 'react-redux';

class SamplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }
  
  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Sample</Text>
        <Text>{ this.state.user.name }</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps)(SamplePage);
