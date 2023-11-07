import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export function useUser() {
  const user = useRouteLoaderData<typeof loader>("root");
  return user;
}
