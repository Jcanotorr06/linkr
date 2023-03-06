import { Dialog } from "@kobalte/core";
import { type JSX, type ParentComponent, Show } from "solid-js";

import styles from "./modal.module.css";

type ModalProps = {
  title?: string;
  trigger?: JSX.Element;
  isOpen?: boolean;
  handleToggle?: () => void;
};

const Modal: ParentComponent<ModalProps> = props => {
  return (
    <Dialog.Root isOpen={props.isOpen} isModal={true} onOpenChange={props.handleToggle}>
      <Show when={props.trigger}>
        <Dialog.Trigger>{props.trigger}</Dialog.Trigger>
      </Show>
      <Dialog.Portal>
        <Dialog.Overlay as="div" class={`fixed inset-0 bg-black bg-opacity-50 ${styles.overlay}`} />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Content
              as="div"
              class={`w-full max-w-md transform overflow-hidden rounded-2xl bg-base-300 text-white p-6 text-left align-middle shadow-xl transition-all ${styles.container}`}
            >
              <Show when={props.title}>
                <Dialog.Title as="h3" class="text-lg font-medium leading-6 mb-4 text-gray-400">
                  {props.title}
                </Dialog.Title>
              </Show>
              {props.children}
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
