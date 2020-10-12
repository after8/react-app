import React from "react";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import styles from "./Layout.module.css";

const layout = (props) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={styles.Content}>{props.children}</main>
  </Aux>
);

export default layout;
