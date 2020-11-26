import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.module.css";

const Layout = (props) => {
  // state = {
  //   showSideDrawer: false,
  // };

  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    //this.setState({ showSideDrawer: false });
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    // because of async nature of setState
    // this may lead to unexpected output
    // this.setState({ showSideDrawer: !this.state.showSideDrawer });
    // instead use function form -> clean way to set state when it depends on old state

    // this.setState((prevState) => {
    //   return { showSideDrawer: !prevState.showSideDrawer };
    // });
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
