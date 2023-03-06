import { BiRegularInfoCircle } from "solid-icons/bi";
import type { ParentComponent } from "solid-js";

type AlertProps = {
  class?: string;
};

const Alert: ParentComponent<AlertProps> = props => {
  return (
    <div class={`alert alert-error shadow-lg ${props.class}`} role="alert">
      <div class="flex items-center">
        <BiRegularInfoCircle class="text-accent mr-2" size={18} />
        {props.children}
      </div>
    </div>
  );
};

export default Alert;
