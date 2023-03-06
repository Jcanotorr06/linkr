import { createForm, custom, Field, Form, maxLength, required } from "@modular-forms/solid";
import { BiRegularLoaderAlt, BiRegularTrash } from "solid-icons/bi";
import { createEffect, createSignal, Show, type VoidComponent } from "solid-js";
import { type FilterLinkInput } from "~/schema/linkSchema";
import { trpc } from "~/utils/trpc";
import { Alert } from "../ui";

type DeleteLinkProps = {
  id: number;
  slug: string;
  handleClose: () => void;
  allLinks: ReturnType<typeof trpc.links.allLinks.useQuery>;
};

const DeleteLink: VoidComponent<DeleteLinkProps> = props => {
  const deleteLink = trpc.links.deleteLink.useMutation();
  const [getLoading, setLoading] = createSignal<boolean>(false);
  const deleteLinkForm = createForm<FilterLinkInput>({
    validateOn: "change",
  });

  const handleSubmit = () => {
    setLoading(true);
    deleteLink.mutate({
      id: props.id,
    });
  };

  createEffect(() => {
    if (deleteLink.isSuccess) {
      setLoading(false);
      props.allLinks.refetch();
      props.handleClose();
    }
    if (deleteLink.isError) {
      setLoading(false);
    }
  });
  return (
    <Form of={deleteLinkForm} onSubmit={handleSubmit}>
      <Show when={deleteLink.error}>
        <Alert>
          <p>{deleteLink.error?.message}</p>
        </Alert>
      </Show>
      <Alert>
        <p class="text-xs">Are you sure you want to delete this link? This action is irreversible</p>
      </Alert>
      <div class="mb-5 mt-4">
        <Field
          of={deleteLinkForm}
          name="slug"
          validate={[
            required("Please enter the slug to confirm"),
            custom(value => value === props.slug, "Make sure the slug is correct"),
            maxLength(20, "The slug should be at most 20 characters long"),
          ]}
        >
          {field => (
            <>
              <label class="block font-medium">Enter the following to confirm:</label>
              <p class="mb-2 text-gray-400 select-none">{props.slug}</p>
              <input
                {...field.props}
                value={field.value}
                required
                placeholder="..."
                class={`mt-1 w-full rounded-md input input-bordered ${field.error ? "border-error" : ""}`}
                maxLength={20}
                onDrop={e => e.preventDefault()}
                onPaste={e => e.preventDefault()}
              />
              <Show when={field.error}>
                <p class="text-red-500 text-xs">{field.error}</p>
              </Show>
            </>
          )}
        </Field>
      </div>
      <div class="flex justify-start">
        <button type="submit" class="btn btn-primary rounded-md flex gap-2" disabled={getLoading()}>
          <Show
            when={getLoading()}
            fallback={
              <>
                <BiRegularTrash /> Delete link
              </>
            }
          >
            <BiRegularLoaderAlt />
            Loading...
          </Show>
        </button>
      </div>
    </Form>
  );
};

export default DeleteLink;
