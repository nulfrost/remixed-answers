import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  console.log(user);
  return null;
}

export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-24">
      <h1 className="font-bold text-3xl text-center mb-2">Remixed Answers</h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        Welcome back, log into your account to gain access to Remixed Answers.
      </p>
      <Form>
        <label htmlFor="username" className="text-gray-500 block mb-1">
          Username
        </label>
        <Input type="text" name="username" id="username" className="mb-4" />
        <label htmlFor="password" className="text-gray-500 block mb-1">
          Password
        </label>
        <Input type="password" name="password" id="password" className="mb-4" />
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
