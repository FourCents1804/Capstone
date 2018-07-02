import React from 'react';
import {
  Text,
  View,
  Animated,
  Button as ButtonAlt,
  ImageBackground,
  Image
} from 'react-native';
import { auth } from '../store/Thunks/User';
import styles from '../../public';
import { connect } from 'react-redux';
import { me } from '../store';
import {
  Button,
  Divider,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start()
  }

  errorValidation = () => {
    const { user } = this.props;
    if (user === 'Failed') {
      return (
        <FormValidationMessage>Wrong Email or Password</FormValidationMessage>
      );
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const formName = 'login';
    this.props.auth(this.state, formName);
  };

  render() {
    let { fadeAnim } = this.state;
    const { navigate } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../public/city.jpg')}
          style={styles.backgroundImg}
          resizeMode="cover"
        >
          <Animated.View style={{ opacity: fadeAnim }}>
          <Image
          style={{ height: 35, width: 100 }}
          source={require('../../public/DimeLogo.png')}
        />
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.loginContainer}>
              <Divider style={styles.dividerVS} />
              <FormInput
                placeholder="Email"
                containerStyle={styles.inputLine}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
              <Divider style={styles.dividerVS} />
              <FormInput
                containerStyle={styles.inputLine}
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
              {this.errorValidation()}

              <Button
                onPress={this.handleSubmit}
                title="Login"
                raised={true}
                backgroundColor="#0080ff"
                style={styles.wideButton}
              />
              <ButtonAlt
                buttonStyle={styles.linkButton}
                onPress={() => navigate('SignUpP1')}
                title="Sign Up"
              >
                <Text style={styles.signUpFont}>Sign Up</Text>
              </ButtonAlt>
            </View>
          </Animated.View>
        </ImageBackground>
      </View>
    );
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
)(Login);
