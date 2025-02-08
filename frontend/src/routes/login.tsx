import { createFileRoute, redirect } from "@tanstack/react-router";
import * as z from "zod";
import Login from "@/pages/login";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: search?.redirect || "/" });
    }
  },

  component: Login,
});
