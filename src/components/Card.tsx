import { BiRegularCopy, BiRegularEdit, BiRegularLoaderAlt, BiRegularSlider, BiRegularTrash } from "solid-icons/bi";
import { createSignal, Show, type VoidComponent } from "solid-js";
import type { trpc } from "~/utils/trpc";
import { DeleteLink, EditLink } from "./forms";
import { Dropdown, DropdownItem } from "./ui";
import Modal from "./ui/Modal";

type CardProps = {
  id: number;
  url: string;
  slug: string;
  description: string;
  class?: string;
  allLinks: ReturnType<typeof trpc.links.allLinks.useQuery>;
};
const Card: VoidComponent<CardProps> = props => {
  const [getOpenEditModal, setOpenEditModal] = createSignal<boolean>(false);
  const [getOpenDeleteModal, setOpenDeleteModal] = createSignal<boolean>(false);
  const [getCopying, setCopying] = createSignal<boolean>(false);
  const origin = new URL(location.href).origin;

  const handleCopy = async () => {
    setCopying(true);
    await navigator.clipboard.writeText(`${origin}/s/${props.slug}`).then(() => {
      setCopying(false);
    });
  };

  return (
    <article
      class={`flex justify-between rounded-lg border border-secondary bg-base-300 p-4 transition-all hover:shadow-lg ${props.class}`}
    >
      <aside class="truncate">
        <div class="flex items-center">
          <a
            class="text-xl text-white transition-all hover:text-gray-300"
            target="_blank"
            rel="noreferrer"
            href={`${origin}/s/${props.slug}`}
          >
            /s/{props.slug}
          </a>
          <button class="btn btn-sm btn-circle btn-ghost ml-1" disabled={getCopying()} onClick={handleCopy}>
            <Show when={getCopying()} fallback={<BiRegularCopy />}>
              <BiRegularLoaderAlt class="animate-spin" />
            </Show>
          </button>
        </div>
        <a href={props.url} rel="noreferrer" target="_blank" class="mb-4 leading-9 link-secondary">
          {props.url}
        </a>
        <p class="text-info">{props.description}</p>
      </aside>
      <div>
        <Dropdown
          title="Options"
          class="btn-ghost btn-sm rounded-md text-xs flex-nowrap flex bg-transparent"
          icon={<BiRegularSlider size={16} />}
        >
          <button class="w-full">
            <DropdownItem class="border-0" icon={<BiRegularCopy size={16} />} onClick={handleCopy}>
              Copy
            </DropdownItem>
          </button>
          <button class="w-full">
            <DropdownItem icon={<BiRegularEdit size={16} />} onClick={() => setOpenEditModal(true)}>
              Edit
            </DropdownItem>
          </button>
          <button class="w-full">
            <DropdownItem icon={<BiRegularTrash size={16} />} onClick={() => setOpenDeleteModal(true)}>
              Delete
            </DropdownItem>
          </button>
        </Dropdown>
        <Modal
          title={`Edit: /s/${props.slug}`}
          isOpen={getOpenEditModal()}
          handleToggle={() => setOpenEditModal(false)}
        >
          <EditLink
            id={props.id}
            url={props.url}
            slug={props.slug}
            description={props.description}
            handleClose={() => setOpenEditModal(false)}
            allLinks={props.allLinks}
          />
        </Modal>
        <Modal
          title={`Delete: /s/${props.slug}`}
          isOpen={getOpenDeleteModal()}
          handleToggle={() => setOpenDeleteModal(false)}
        >
          <DeleteLink
            id={props.id}
            slug={props.slug}
            handleClose={() => setOpenDeleteModal(false)}
            allLinks={props.allLinks}
          />
        </Modal>
      </div>
    </article>
  );
};

export default Card;
