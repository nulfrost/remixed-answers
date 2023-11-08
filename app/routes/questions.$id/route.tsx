import QuestionCard from "./Question";
import {
  useSubmit,
  useLocation,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { ChangeEvent } from "react";
import { Comment } from "./Comment";
import { getSingleQuestion } from "./getSingleQuestion";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { zx } from "zodix";
import { z } from "zod";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = zx.parseParams(params, {
    id: z.number(),
  });
  const question = await getSingleQuestion(id);
  return json(question);
}

export default function QuestionSlug() {
  const submit = useSubmit();
  const location = useLocation();
  const fetcher = useFetcher();
  const question = useLoaderData<typeof loader>();

  function handleCommentSortDirection(event: ChangeEvent<HTMLSelectElement>) {
    submit((event.currentTarget || event.target).closest("form"));
  }
  return (
    <article>
      <QuestionCard {...question} />
      <section className="mb-4">
        <p className="font-bold text-lg">13 Answers</p>
        <fetcher.Form
          action={(() => {
            let params = new URLSearchParams(location.search);
            let search = params.toString();
            search = search ? "?" + search : "";
            return location.pathname + search;
          })()}
          className="mb-4"
        >
          <label htmlFor="sortAnswers" className="sr-only">
            Sort answers by
          </label>
          <select
            name="sortAnswers"
            id="sortAnswers"
            className="block rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleCommentSortDirection}
          >
            <option value="recent">Recent Answers</option>
            <option value="oldest">Oldest Answers</option>
          </select>
        </fetcher.Form>
        <ul className="[&>*]:border [&>*]:border-b-0 max-w-[60ch]">
          {Array.from({ length: 2 }, (_, index) => (
            <Comment key={index} />
          ))}
        </ul>
      </section>
    </article>
  );
}
