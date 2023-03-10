import { signIn, signOut } from "@auth/solid-start/client";
import { BiRegularBox, BiRegularExit, BiRegularHash, BiRegularMessageSquareEdit, BiRegularPlus } from "solid-icons/bi";
import { Show, type VoidComponent } from "solid-js";
import { A } from "solid-start";
import { createSession } from "~/utils/createSession";
import { Dropdown, DropdownItem } from "./ui";

const Auth: VoidComponent = () => {
  const sessionData = createSession();

  return (
    <Show
      when={!!sessionData()}
      fallback={
        <button class="btn btn-ghost rounded" onClick={() => void signIn("github", { callbackUrl: "/dash" })}>
          Sign In
        </button>
      }
    >
      <Dropdown
        title={sessionData()?.user?.name ?? "user"}
        class="btn-ghost rounded"
        icon={<BiRegularHash size={18} />}
      >
        <A href="/dash/create">
          <DropdownItem icon={<BiRegularPlus size={16} />}>Create new link</DropdownItem>
        </A>
        <A href="/dash">
          <DropdownItem icon={<BiRegularBox size={16} />}>Dashboard</DropdownItem>
        </A>
        <a href="https://github.com/Jcanotorr06/linkr/issues/new" target="_blank" rel="noreferrer">
          <DropdownItem icon={<BiRegularMessageSquareEdit size={16} />} external={true}>
            Report a bug
          </DropdownItem>
        </a>
        <DropdownItem icon={<BiRegularExit size={16} />} onClick={() => void signOut()}>
          Sign Out
        </DropdownItem>
      </Dropdown>
    </Show>
  );
};

export default Auth;
