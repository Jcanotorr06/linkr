import { BiRegularPlus } from "solid-icons/bi";
import { Show, Suspense } from "solid-js";
import { A, Navigate, Outlet, useMatch } from "solid-start";
import { Loader, Reveal, Up } from "~/components";
import { useSession } from "~/utils/useSession";

const Dashboard = () => {
  const isCreate = useMatch(() => "/dash/create");
  const sessionData = useSession();

  return (
    <Suspense
      fallback={
        <div class="mt-8 flex flex-col items-center justify-center">
          <p class="mb-2">Loading your links...</p>
          <Loader />
        </div>
      }
    >
      <Show when={sessionData() !== null} fallback={<Navigate href="/" />}>
        <Reveal>
          <section class="border-b-2 border-secondary mt-1">
            <article class="container px-4 md:px-0 mx-auto pb-3 flex items-center justify-between">
              <h1 class="text-2xl">
                <Show when={isCreate()} fallback={<>Dashboard</>}>
                  Create Link
                </Show>
              </h1>
              <Show when={!isCreate()}>
                <A href="/dash/create" class="btn btn-ghost btn-sm rounded">
                  <BiRegularPlus class="mr-2" />
                  Create new link
                </A>
              </Show>
            </article>
          </section>
          <Up delay={100}>
            <section class="container mx-auto px-4 md:px-0">
              <Outlet />
            </section>
          </Up>
        </Reveal>
      </Show>
    </Suspense>
  );
};

export default Dashboard;
