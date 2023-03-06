import type { JSX, VoidComponent } from "solid-js";

type InputProps = {
  placeholder?: string;
} & JSX.HTMLAttributes<HTMLInputElement>;
const Input: VoidComponent<InputProps> = props => {
  return <input class={`mt-1 w-full rounded-md input input-bordered ${props.class}`} {...props} />;
};

export default Input;
