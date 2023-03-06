import { type APIEvent, json } from "solid-start";
import { prisma } from "~/server/db/client";

export const GET = async (event: APIEvent) => {
  const slug = event.params.slug;
  if (!slug || slug.length < 6 || slug.length > 20) {
    return json({ error: "[X] Error: Invalid slug" }, { status: 400 });
  }

  const data = await prisma.link.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return json({ error: "[X] Error: Link not found" }, { status: 404 });
  }

  return json(data);
};
