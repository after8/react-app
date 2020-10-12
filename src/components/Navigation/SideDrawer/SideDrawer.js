import React from "react";
import Logo from "../../Logo/Logo.js";
import NavigationItems from "../NavigationItems/NavigationItems.js";

import styles from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  return (
    <div className={styles.SideDrawer}>
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
