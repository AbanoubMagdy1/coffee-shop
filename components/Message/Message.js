import React from "react";
import clsx from "clsx";
import styles from "./Message.module.scss";

export default function Message({ children, state }) {
  return (
    <div className={clsx(styles.message, styles[state])}>
      {children}
    </div>
  );
}

Message.defaultProps = {
  state: "error"
};