import { z } from "zod";
import { router, protectedProcedure } from "../utils";
import { prisma } from "~/server/db/client";
import { CreateLinkSchema, EditLinkSchema } from "~/schema/linkSchema";
export default router({
  allLinks: protectedProcedure.query(({ ctx }) => {
    return prisma.link.findMany({
      where: {
        creatorId: ctx.session?.user?.id,
      },
    });
  }),
  editLink: protectedProcedure.input(EditLinkSchema).mutation(({ input, ctx }) => {
    return prisma.link.update({
      where: {
        slug: input.slug,
      },
      data: {
        ...input,
        creatorId: ctx.session?.user?.id,
      },
    });
  }),
  deleteLink: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => {
    return prisma.link.delete({
      where: {
        id: input.id,
      },
    });
  }),
  createLink: protectedProcedure.input(CreateLinkSchema).mutation(({ input, ctx }) => {
    return prisma.link.create({
      data: {
        slug: input.slug,
        url: input.url,
        description: input.description,
        creatorId: ctx.session?.user?.id,
      },
    });
  }),
});
