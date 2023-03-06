import { BiRegularRocket } from "solid-icons/bi";
import { createEffect, createSignal, Match, Switch } from "solid-js";
import { A } from "solid-start";
import { Alert, Loader } from "~/components";
import Card from "~/components/Card";
import { trpc } from "~/utils/trpc";

const Dashboard = () => {
  const allLinks = trpc.links.allLinks.useQuery();
  const [getFilter, setFilter] = createSignal<string>("");
  const [getLinks, setLinks] = createSignal(allLinks.data);

  createEffect(() => {
    setLinks(allLinks.data?.filter(link => link.url.includes(getFilter())));
  });

  return (
    <section class="my-6">
      <article class="w-full">
        <input
          type="text"
          role="search"
          class="w-full rounded mt-1 input input-bordered"
          id="filter"
          placeholder="Seatch links..."
          disabled={allLinks.isLoading || allLinks.isError || !allLinks.data?.length}
          onInput={e => setFilter(e.currentTarget.value)}
          value={getFilter()}
        />
      </article>
      <Switch>
        <Match when={allLinks.isLoading}>
          <article class="mt-8 flex flex-col items-center justify-center">
            <p class="mb-2">Loading your links...</p>
            <Loader />
          </article>
        </Match>
        <Match when={allLinks.isError}>
          <Alert>
            <p>{allLinks.error?.message}</p>
          </Alert>
        </Match>
        <Match when={allLinks.isSuccess && !allLinks.data?.length}>
          <article class="mt-5 flex flex-col items-center justify-center">
            <BiRegularRocket class="mb-4 text-secondary" size={64} />
            <p class="mb-4 text-xl">Let's create your first link!</p>
            <A href="/dash/create" class="btn btn-primary rounded">
              Create a link
            </A>
          </article>
        </Match>
        <Match when={allLinks.isSuccess && !!allLinks.data?.length && !!getLinks()}>
          <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {getLinks()?.map(link => (
              <Card
                id={link.id}
                url={link.url}
                slug={link.slug}
                description={link.description || "No description"}
                allLinks={allLinks}
              />
            ))}
          </div>
        </Match>
      </Switch>
    </section>
  );
};

export default Dashboard;
