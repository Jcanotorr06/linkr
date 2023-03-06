import { initTRPC, TRPCError } from "@trpc/server";
import type { IContext } from "./context";
export const t = initTRPC.context<IContext>().create();
export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this resource",
      });
    }
    return next({ ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user }, } });
  })
);
