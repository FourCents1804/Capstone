import React from "react";
import {
  Text,
  View,
  Animated,
  Button as ButtonAlt,
  ImageBackground,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { auth } from "../store/Thunks";
import styles from "../../public";
import { connect } from "react-redux";
import { me } from "../store/Thunks";
import {
  Button,
  Divider,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    fadeAnim: new Animated.Value(0),
    error: " "
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  handleSubmit = async event => {
    event.preventDefault();
    const formName = "login";
    const authError = await this.props.auth(this.state, formName);
    if (authError && this.isMounted) {
      this.setState({ error: authError });
    }
  };

  render() {
    const { fadeAnim } = this.state;
    const { navigate } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../public/city.jpg")}
          style={styles.backgroundImg}
          resizeMode="cover"
        >
          <KeyboardAvoidingView enabled behavior="position">
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={styles.loginContainer}>
                <Image
                  style={{ paddingTop: 100, height: 40, width: 250 }}
                  source={require("../../public/DimeLogo.png")}
                />
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
                <FormValidationMessage>
                  {this.state.error}
                </FormValidationMessage>

                <Button
                  onPress={this.handleSubmit}
                  title="Login"
                  raised={true}
                  backgroundColor="#0080ff"
                  style={styles.wideButton}
                />
                <Button
                  style={styles.wideButton}
                  onPress={() => navigate("SignUpP1")}
                  title="Sign Up"
                  raised={true}
                  backgroundColor="#E90909"
                >
                  <Text style={styles.signUpFont}>Sign Up</Text>
                </Button>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (userData, formName) => dispatch(auth(userData, formName))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
