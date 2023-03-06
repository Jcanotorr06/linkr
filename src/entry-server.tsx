import { redirect } from "solid-start";
import { StartServer, createHandler, renderAsync } from "solid-start/entry-server";

export default createHandler(
  ({ forward }) => {
    return async event => {
      const regex = /^\/s\/[a-zA-Z0-9_-]{6,20}$/i;
      const path = new URL(event.request.url).pathname;
      const origin = new URL(event.request.url).origin;
      if (path.match(regex)) {
        const slug = path.split("/").pop();
        const data = await fetch(`${origin}/api/url/${slug}`);

        if (data.status === 404) {
          return redirect("/");
        }

        if (data.status === 400) {
          return redirect("/");
        }

        const dataJson = await data.json();

        if (dataJson?.url) {
          return redirect(new URL(dataJson.url).href);
        }

        return redirect("/");
      }
      return forward(event);
    };
  },
  renderAsync(event => <StartServer event={event} />)
);
