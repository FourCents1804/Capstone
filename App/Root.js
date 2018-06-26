import React from 'react';
import { ScrollView } from 'react-native';
import { auth } from './store/Thunks/User';
import { Home, Login } from './components';
import { connect } from 'react-redux';
import { me } from './store';
import styles from '../public';
import {
  Text,
  Button,
  FormInput,
  FormLabel,
  FormValidationMessage,
  Header
} from 'react-native-elements';

class Root extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  render() {
    const { navigate } = this.props.navigation;
    let { user } = this.props;
    if (user === undefined) user = {};
    // return user.id ? (
    //   <Home navigate={navigate} />
    // ) : (
    //   <Login navigate={navigate} />
    // );
    return (
      <Home navigate={navigate} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.User
});

const mapDispatchToProps = dispatch => ({
  isLoggedIn: () => dispatch(me()),
  auth: (userData, formName) => dispatch(auth(userData, formName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
