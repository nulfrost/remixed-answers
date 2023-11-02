import QuestionCard from "./Question";
import { Form, useSubmit, useLocation } from "@remix-run/react";
import { ChangeEventHandler } from "react";
import { Comment } from "./Comment";

export default function QuestionSlug() {
  const submit = useSubmit();
  const location = useLocation();

  function handleCommentSortDirection(
    event: ChangeEventHandler<HTMLSelectElement>
  ) {
    submit((event.currentTarget || event.target).closest("form"));
  }
  return (
    <div>
      <QuestionCard />
      <div className="flex items-baseline mb-4 gap-4">
        <p className="font-bold text-lg">13 Answers</p>
        <Form
          action={(() => {
            let params = new URLSearchParams(location.search);
            let search = params.toString();
            search = search ? "?" + search : "";
            return location.pathname + search;
          })()}
        >
          <label htmlFor="sortAnswers" className="sr-only">
            Sort answers by
          </label>
          <select
            name="sortAnswers"
            id="sortAnswers"
            className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={handleCommentSortDirection}
          >
            <option value="recent">Recent Answers</option>
            <option value="oldest">Oldest Answers</option>
          </select>
        </Form>
      </div>
      <div className="[&>*]:border [&>*]:border-b-0 max-w-[60ch]">
        {Array.from({ length: 2 }, (_, index) => (
          <Comment key={index} />
        ))}
      </div>
    </div>
  );
}
