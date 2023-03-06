import type { ParentComponent } from "solid-js";
import styles from "./up.module.css";

type UpProps = {
  delay?: number;
};

const Up: ParentComponent<UpProps> = props => {
  return (
    <div class={`${styles.container}`} style={{ "animation-delay": `${props.delay ?? 0}ms` }}>
      {props.children}
    </div>
  );
};

export default Up;
