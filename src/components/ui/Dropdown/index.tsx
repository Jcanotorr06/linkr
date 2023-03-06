import { DropdownMenu } from "@kobalte/core";
import { type JSXElement, type ParentComponent, Show } from "solid-js";
import { BiRegularLinkExternal } from "solid-icons/bi";

import styles from "./dropdown.module.css";

type DropdownProps = {
  title?: string;
  external?: boolean;
  onClick?: () => void;
  icon?: JSXElement;
  class?: string;
};

const Dropdown: ParentComponent<DropdownProps> = props => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger as="button" class={`${props.class} btn rounded`}>
        <Show when={!!props.icon}>
          <DropdownMenu.Icon>{props.icon}</DropdownMenu.Icon>
          &nbsp;
        </Show>
        {props.title}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          class={`absolute p-1 right-2 mt-2 w-56 origin-top-right z-40 rounded-md bg-base-200 border border-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${styles["dropdown-content"]}`}
        >
          {props.children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

type DropdownItemProps = {
  class?: string;
} & DropdownProps;
const DropdownItem: ParentComponent<DropdownItemProps> = props => {
  return (
    <DropdownMenu.Item>
      <div
        class={`hover:cursor-poitner block justify-between rounded text-stone-200 px-3 py-2 text-sm hover:bg-primary duration-200 ${props.class}`}
        onClick={props.onClick}
      >
        <div class="flex items-center">
          <Show when={!!props.icon}>
            <div class="mr-2">{props.icon}</div>
          </Show>
          {props.children}
          <Show when={!!props.external}>
            <div class="ml-2">
              <BiRegularLinkExternal size={12} class="text-secondary" />
            </div>
          </Show>
        </div>
      </div>
    </DropdownMenu.Item>
  );
};

export { Dropdown, DropdownItem };
