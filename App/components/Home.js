import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Pie, { userPurchases } from '../D3/Doughnut';
import { SpendTable } from './';
import styles from '../../public';
import React, { Component } from 'react';
import {Permissions } from 'expo';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {
  state = {
    user: {},


  };

  componentWillMount() {
      Permissions.askAsync(Permissions.LOCATION)
  }

  render() {
    const chartWidth = 250;
    const chartHeight = 250;
    const { user, navigate } = this.props;
    const firstName = user ? `, ${user.firstName}` : ``
    //In
      return (
        <View style={styles.homeContainer}>
          <ScrollView style={{ paddingTop: 10 }}>
            <Text style={styles.thinTitle}>Welcome{firstName}!</Text>
            <Pie userPurchases={userPurchases} />
            <SpendTable />
          </ScrollView>
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            style={styles.actionButton}
          >
            <ActionButton.Item
              buttonColor="#3498db"
              title="Camera"
              onPress={() => navigate('Webcam')}
            >
              <Icon name="ios-camera" size={30} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Keyboard"
              onPress={() => navigate('Purchase')}
            >
              <Icon name="ios-keypad" size={30} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      );
    // }
  }
}

const mapStateToProps = state => {
  return {
    user: state.User.userInfo,
    purchases: state.User.purchases,
  }
}

export default connect(
  mapStateToProps,
  null
)(Home);
