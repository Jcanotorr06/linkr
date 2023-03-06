import { createEffect, createSignal, Show, type VoidComponent } from "solid-js";
import {
  createForm,
  setValue,
  setError,
  Form,
  Field,
  minLength,
  url,
  required,
  pattern,
  maxLength,
} from "@modular-forms/solid";
import type { CreateLinkInput } from "~/schema/linkSchema";
import { nanoid } from "nanoid/async";
import { BiRegularLoaderAlt, BiRegularRefresh, BiRegularRocket } from "solid-icons/bi";
import { trpc } from "~/utils/trpc";
import { useNavigate } from "solid-start";

const CreateLink: VoidComponent = () => {
  const createLink = trpc.links.createLink.useMutation();
  const navigate = useNavigate();
  const [getLoading, setLoading] = createSignal<boolean>(false);

  const createLinkForm = createForm<CreateLinkInput>({ validateOn: "change" });

  const handleGenerateSlug = async () => {
    // Generate random number between 6 and 10
    const randomLength = Math.floor(Math.random() * 5) + 6;
    const randomSlug = await nanoid(randomLength);
    setValue(createLinkForm, "slug", randomSlug);
  };

  const handleSubmit = (data: CreateLinkInput) => {
    setLoading(true);
    if (data.slug === data.url) {
      setError(createLinkForm, "url", "The URL and the slug cannot be the same");
      setLoading(false);
      return;
    }
    createLink.mutate(data);
  };

  createEffect(() => {
    if (createLink.isSuccess) {
      setLoading(false);
      navigate("/dash");
    }
    if (createLink.isError) {
      setError(createLinkForm, "slug", "Slug already exists. Please try another one or click the `Randomize` button`");
    }
  });

  return (
    <Form of={createLinkForm} onSubmit={handleSubmit}>
      <div class="mb-5">
        <Field
          of={createLinkForm}
          name="url"
          validate={[
            required("Please enter your url"),
            url("Please enter a valid URL. It should start with https:// or http://"),
            minLength(8, "Please enter a valid URL. It should be at least 8 characters long"),
          ]}
        >
          {field => (
            <>
              <label class="block text-sm font-medium">Enter the URL here:</label>
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
      <div class="mb-5">
        <Field
          of={createLinkForm}
          name="slug"
          validate={[
            required("Please enter a slug"),
            minLength(6, "Please enter a valid slug"),
            pattern(
              /^[a-zA-Z0-9_-]+$/i,
              "Please enter a valid slug containing only letters, numbers, underscores and dashes"
            ),
            maxLength(20, "Please enter a valid slug. It should be at most 20 characters long"),
          ]}
        >
          {field => (
            <>
              <label class="block text-sm font-medium">Custom slug:</label>
              <div class="mt-1 flex items-center justify-between w-full">
                <input
                  {...field.props}
                  value={field.value}
                  required
                  placeholder="Custom slug"
                  class={`w-full rounded-md input input-bordered ${field.error ? "border-error" : ""}`}
                  maxLength={20}
                />
                <button type="button" class="btn rounded-lg btn-secondary ml-1" onClick={handleGenerateSlug}>
                  <BiRegularRefresh class="mr-1" />
                  Randomize
                </button>
              </div>
              <Show when={field.error}>
                <p class="text-red-500 text-xs">{field.error}</p>
              </Show>
            </>
          )}
        </Field>
      </div>
      <div class="mb-3">
        <Field of={createLinkForm} name="description">
          {field => (
            <>
              <label class="block text-sm font-medium">Description (optional):</label>
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
      <div class="flex justify-start">
        <button type="submit" class="btn btn-primary flex gap-2 rounded-md" disabled={getLoading()}>
          <Show
            when={getLoading()}
            fallback={
              <>
                <BiRegularRocket />
                Create your link
              </>
            }
          >
            <BiRegularLoaderAlt class="animate-spin" />
            Loading...
          </Show>
        </button>
      </div>
    </Form>
  );
};

export default CreateLink;
