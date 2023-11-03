import { useForm } from "@conform-to/react";
import { parse, refine } from "@conform-to/zod";
import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/Button";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Input } from "~/components/Input";
import {
  registerUser,
  checkIfEmailExists,
  checkIfUsernameExists,
} from "./register";

export const meta: MetaFunction = () => {
  return [
    { title: "Remixed Answers | Register" },
    { property: "og:title", content: "Remixed Answers | Register" },
    {
      property: "og:description",
      content: "Log in to your Remixed Answers account",
    },
    { name: "description", content: "Log in to your Remixed Answers account " },
  ];
};

function createRegisterSchema(
  intent: string,
  constraint?: {
    isEmailUnique?: (email: string) => Promise<boolean>;
    isUsernameUnique?: (username: string) => Promise<boolean>;
  }
) {
  return z
    .object({
      username: z
        .string({ required_error: "Please enter a username" })
        .min(5, "Username must be at least 10 characters")
        .max(20, "Username cannot exceed 20 characters")
        .pipe(
          z.string().superRefine((username, ctx) =>
            refine(ctx, {
              validate: () => constraint?.isUsernameUnique?.(username),
              when: intent === "submit" || intent === "validate/username",
              message: "User with this username already exists",
            })
          )
        ),
      email: z
        .string({ required_error: "Please enter an e-mail" })
        .email("E-mail is invalid")
        .pipe(
          z.string().superRefine((email, ctx) =>
            refine(ctx, {
              validate: () => constraint?.isEmailUnique?.(email),
              when: intent === "submit" || intent === "validate/email",
              message: "User with this e-mail already exists",
            })
          )
        ),
      password: z
        .string({ required_error: "Please enter a password" })
        .min(10, "Password must be at least 10 characters"),
      confirmPassword: z.string({
        required_error: "Please confirm your password",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: (intent) => {
      return createRegisterSchema(intent, {
        isEmailUnique(email: string) {
          return checkIfEmailExists(email);
        },
        isUsernameUnique(username: string) {
          return checkIfUsernameExists(username);
        },
      });
    },
    async: true,
  });

  if (submission.intent !== "submit" || !submission.value) {
    return json(submission);
  }

  await registerUser(submission.payload);

  return redirect("/login");
}

export default function Register() {
  const lastSubmission = useActionData<typeof action>();
  const [form, { username, password, confirmPassword, email }] = useForm({
    lastSubmission,
  });

  return (
    <div className="max-w-sm mx-auto mt-24">
      <h1 className="font-bold text-3xl text-center mb-2">Remixed Answers</h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        No account? No problem! Register below.
      </p>
      <Form method="post" {...form.props} replace>
        <label
          htmlFor="username"
          id="usernameLabel"
          className="text-gray-500 block mb-1"
        >
          Username (required)
        </label>
        {username.error && (
          <ErrorMessage message={{ id: username.id, error: username.error }} />
        )}
        <span className="block mb-4">
          <Input
            type="text"
            name="username"
            id="username"
            required
            autoFocus
            minLength={5}
            maxLength={20}
            aria-required
            aria-invalid={username.error ? "true" : undefined}
            aria-describedby={
              username.error ? `${username.id}-error` : undefined
            }
            aria-labelledby="usernameLabel usernameDesc"
          />
          <span id="usernameDesc" className="text-sm text-gray-500">
            Username must be at least 10 characters long and must not exceed 20
            characters long.
          </span>
        </span>
        <label
          htmlFor="username"
          id="usernameLabel"
          className="text-gray-500 block mb-1"
        >
          E-mail (required)
        </label>
        {email.error && (
          <ErrorMessage message={{ id: email.id, error: email.error }} />
        )}
        <Input
          type="email"
          name="email"
          id="email"
          className="mb-4"
          required
          aria-required
          aria-invalid={email.error ? "true" : undefined}
          aria-describedby={email.error ? `${email.id}-error` : undefined}
          aria-labelledby="usernameLabel usernameDesc"
        />
        <label
          htmlFor="password"
          id="passwordLabel"
          className="text-gray-500 block mb-1"
        >
          Password (required)
        </label>
        {password.error && (
          <ErrorMessage message={{ id: password.id, error: password.error }} />
        )}
        <span className="block mb-4">
          <Input
            type="password"
            name="password"
            id="password"
            required
            minLength={10}
            aria-required
            aria-invalid={password.error ? "true" : undefined}
            aria-describedby={
              password.error ? `${password.id}-error` : undefined
            }
            aria-labelledby="passwordLabel passwordDesc"
          />
          <span className="text-sm text-gray-500" id="passwordDesc">
            Password must be at least 10 characters long.
          </span>
        </span>
        <label
          htmlFor="confirmPassword"
          id="confirmPasswordLabel"
          className="text-gray-500 block mb-1"
        >
          Confirm Password (required)
        </label>
        {confirmPassword.error && (
          <ErrorMessage
            message={{ id: confirmPassword.id, error: confirmPassword.error }}
          />
        )}
        <span className="block mb-4">
          <Input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            id="confirmPassword"
            required
            aria-required
            aria-invalid={confirmPassword.error ? "true" : undefined}
            aria-describedby={
              confirmPassword.error ? `${confirmPassword.id}-error` : undefined
            }
            aria-labelledby="confirmPasswordLabel confirmPasswordDesc"
          />
          <span className="text-sm text-gray-500" id="confirmPasswordDesc">
            Confirm your password, enter the same password as you did in the
            previous input.
          </span>
        </span>
        <Link
          to="/login"
          className="text-indigo-600 text-sm hover:underline mb-4 inline-block"
        >
          Already have an account? Log in here.
        </Link>
        <Button className="w-full py-2" type="submit">
          Register Account
        </Button>
      </Form>
    </div>
  );
}
