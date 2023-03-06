import { createForm, Field, Form, minLength, required, url, getValue } from "@modular-forms/solid";
import { BiRegularCheck, BiRegularLoaderAlt } from "solid-icons/bi";
import { createSignal, Show } from "solid-js";
import { createEffect } from "solid-js";
import { type VoidComponent } from "solid-js";
import type { EditLinkInput } from "~/schema/linkSchema";
import { trpc } from "~/utils/trpc";
import { Alert } from "../ui";

type EditLinkProps = {
  id: number;
  url: string;
  slug: string;
  description?: string;
  handleClose: () => void;
  allLinks: ReturnType<typeof trpc.links.allLinks.useQuery>;
};

const EditLink: VoidComponent<EditLinkProps> = props => {
  const editLink = trpc.links.editLink.useMutation();
  const [getLoading, setLoading] = createSignal<boolean>(false);
  const editLinkForm = createForm<EditLinkInput>({
    validateOn: "change",
    initialValues: { url: props.url, slug: props.slug, description: props.description },
  });

  const handleSubmit = (data: EditLinkInput) => {
    setLoading(true);
    editLink.mutate({
      slug: props.slug,
      url: data.url,
      description: data.description,
    });
  };

  createEffect(() => {
    if (editLink.isSuccess) {
      setLoading(false);
      props.allLinks.refetch();
      props.handleClose();
    }
    if (editLink.isError) {
      setLoading(false);
    }
  });

  return (
    <Form of={editLinkForm} onSubmit={handleSubmit}>
      <Show when={editLink.error}>
        <Alert>
          <p>{editLink.error?.message}</p>
        </Alert>
      </Show>
      <div class="mb-5">
        <Field
          of={editLinkForm}
          name="url"
          validate={[
            required("Please enter your url"),
            minLength(8, "Please enter a valid URL. It should be at least 8 characters long"),
            url("Please enter a valid URL. It should start with https:// or http://"),
          ]}
        >
          {field => (
            <>
              <label class="block text-sm font-medium">Enter the new URL here:</label>
              <input
                {...field.props}
                value={field.value}
                required
                placeholder="https://"
                class={`mt-1 w-full rounded-md input input-bordered ${field.error ? "border-error" : ""}`}
              />
              <Show when={field.error}>
                <p class="text-red-500 text-xs">{field.error}</p>
              </Show>
            </>
          )}
        </Field>
      </div>
      <div class="mb-3">
        <Field of={editLinkForm} name="description">
          {field => (
            <>
              <label class="block text-sm font-medium">Description:</label>
              <textarea
                {...field.props}
                value={field.value}
                placeholder="Description"
                class="mt-1 w-full rounded-md textarea textarea-bordered"
              />
            </>
          )}
        </Field>
      </div>
      <Alert class="mb-3">
        <p>This action is irreversible</p>
      </Alert>
      <div class="flex justify-start">
        <button
          type="submit"
          class="btn btn-primary rounded-md flex gap-2"
          disabled={
            getLoading() ||
            (props.url === getValue(editLinkForm, "url") && props.description === getValue(editLinkForm, "description"))
          }
        >
          <Show
            when={getLoading()}
            fallback={
              <>
                <BiRegularCheck /> Edit link
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

export default EditLink;
