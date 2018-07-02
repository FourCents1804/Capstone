import React from "react";
import { View } from "react-native";
import { Home, Login, Navigation, Menu, Loading, PastSpend } from "./components";
import { connect } from "react-redux";
import Firebase from "./components/Firebase/Firebase";
import styles from "../public";
import Drawer from "react-native-drawer";

class Root extends React.Component {
  state = {
    isLoggedIn: false,
    loading: true
  };
  componentDidMount() {
    Firebase.init();
    Firebase.auth.onAuthStateChanged(user => {
      user
        ? this.setState({ isLoggedIn: true, loading: false })
        : this.setState({ isLoggedIn: false, loading: false });
    });
  }

  closeMenu = () => {
    this._drawer.close();
  };

  openMenu = () => {
    this._drawer.open();
  };

  render() {
    const drawerStyles = {
      drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 }
    };
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return (
        <Loading />
      );
    } else if (this.state.isLoggedIn) {
      return (
        <Drawer
          ref={ref => (this._drawer = ref)}
          type="displace"
          content={<Menu navigate={navigate} />}
          tapToClose={true}
          openDrawerOffset={0.3}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={ratio => ({
            main: { opacity: (2 - ratio) / 2 }
          })}
        >
          <View style={{ flex: 1 }}>
            <Navigation navigate={navigate} openMenu={this.openMenu} />
            <Home navigate={navigate} />
          </View>
        </Drawer>
      );
    } else {
      return <Login navigate={navigate} />;
    }
  }
}

const mapStateToProps = state => ({
  user: state.User
});

export default connect(
  mapStateToProps,
  null
)(Root);
