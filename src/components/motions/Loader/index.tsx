import { BiRegularLoaderAlt } from "solid-icons/bi";
import type { VoidComponent } from "solid-js";

type LoaderProps = {
  class?: string;
};

const Loader: VoidComponent<LoaderProps> = props => {
  return (
    <div class={props.class}>
      <BiRegularLoaderAlt size={22} class="animate-spin text-primary" />
    </div>
  );
};

export default Loader;
