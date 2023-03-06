import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";

const useSession = () => {
  return createServerData$(
    async (_, event) => {
      return await getSession(event.request, authOpts);
    },
    { key: () => ["auth_user"] }
  );
};

export { useSession };
