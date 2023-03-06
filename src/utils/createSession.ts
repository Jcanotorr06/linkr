import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";

const createSession = () => {
  return createServerData$(async (_, event) => {
    return await getSession(event.request, authOpts);
  });
};

export { createSession };
