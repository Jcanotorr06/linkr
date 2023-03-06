import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import Github from "@auth/core/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";
import type { Adapter } from "@auth/core/adapters";

export const authOpts: SolidAuthConfig = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    // @ts-expect-error Types Issue
    Github({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: false,
};

export const { GET, POST } = SolidAuth(authOpts);
