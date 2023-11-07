import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useId } from "react";
import { z } from "zod";
import { Button } from "~/components/Button";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Input } from "~/components/Input";
import { useUser } from "~/hooks/useUser";
import { authenticator } from "~/services/auth.server";

const QuestionSchema = z.object({
  title: z
    .string({ required_error: "Please enter a title" })
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must not exceed 100 characters"),
  body: z.string().max(5000, "Body cannot exceed 5000 characters").optional(),
  category: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema: QuestionSchema });
  if (submission.intent !== "submit" || !submission.value) {
    return json(submission);
  }
  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return null;
}

export default function NewQuestion() {
  const lastSubmission = useActionData<typeof action>();
  const user = useUser();
  const id = useId();
  const [form, { title }] = useForm({
    id,
    lastSubmission,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-xl mb-4">What's on your mind?</h1>
      <Form method="post" {...form.props}>
        <input type="hidden" name="userId" value={user?.id} />
        <label htmlFor={title.id} className="mb-1 block text-gray-500">
          Title (required)
        </label>
        {title.error && (
          <ErrorMessage message={{ id: title.id, error: title.error }} />
        )}
        <Input
          type="text"
          className="mb-5"
          autoFocus
          required
          id={title.id}
          aria-required
          aria-invalid={title.error ? "true" : undefined}
          aria-describedby={title.error ? `${title.id}-error` : undefined}
        />
        <label htmlFor="body" className="mb-1 block text-gray-500">
          Body
        </label>
        <textarea
          className="block mb-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
          rows={10}
          maxLength={5000}
        />
        <Button type="submit" className="w-full py-2">
          Ask Question
        </Button>
      </Form>
    </div>
  );
}
