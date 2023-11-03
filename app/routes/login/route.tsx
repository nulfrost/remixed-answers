import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { authenticate, authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";
import { commitSession, getSession } from "~/services/session.server";
import { ErrorMessage } from "~/components/ErrorMessage";

export const meta: MetaFunction = () => {
  return [
    { title: "Remixed Answers | Login" },
    { property: "og:title", content: "Remixed Answers | Login" },
    {
      property: "og:description",
      content: "Log in to your Remixed Answers account",
    },
    { name: "description", content: "Log in to your Remixed Answers account" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  let session;
  try {
    session = await authenticator.authenticate("form", request, {
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return json({ error: { message: error.message } }, {
        status: 400,
      } as const);
    }
  }
  const cookieSession = await getSession(request.headers.get("cookie"));
  cookieSession.set("__session", session);
  throw redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(cookieSession),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticate(request);
  return null;
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="max-w-sm mx-auto mt-24">
      <h1 className="font-bold text-3xl text-center mb-2">Remixed Answers</h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        Welcome back, log into your account to gain access to Remixed Answers.
      </p>
      <Form method="post">
        <label htmlFor="username" className="text-gray-500 block mb-1">
          Username
        </label>
        {actionData?.error.message && (
          <ErrorMessage
            message={{ id: "username", error: actionData?.error.message }}
          />
        )}
        <Input
          type="text"
          name="username"
          id="username"
          className="mb-4"
          autoFocus
          required
          aria-required
        />
        <label htmlFor="password" className="text-gray-500 block mb-1">
          Password
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          aria-required
          className="mb-4"
          autoComplete="current-password"
        />
        <Link
          to="/register"
          className="text-indigo-600 text-sm hover:underline mb-4 inline-block"
        >
          No account? Register here.
        </Link>
        <Button className="w-full py-2">Log in</Button>
      </Form>
    </div>
  );
}
