import type { ParentComponent } from "solid-js";

import styles from "./reveal.module.css";

const Reveal: ParentComponent = props => {
  return <div class={styles.container}>{props.children}</div>;
};

export default Reveal;
