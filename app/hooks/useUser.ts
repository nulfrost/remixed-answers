import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export function useUser() {
  return useRouteLoaderData<typeof loader>("root")?.user;
}
