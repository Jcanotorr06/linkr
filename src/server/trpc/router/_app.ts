import { router } from "../utils";
import example from "./example";
import links from "./links";

export const appRouter = router({
  example,
  links,
});

export type IAppRouter = typeof appRouter;
