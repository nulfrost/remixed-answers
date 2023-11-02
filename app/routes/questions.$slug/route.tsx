import QuestionCard from "./Question";
import { Form, useSubmit, useLocation } from "@remix-run/react";
import * as Avatar from "@radix-ui/react-avatar";
import { ChangeEventHandler } from "react";

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
          <div
            key={index}
            className="border-gray-200 p-4 first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:border-b last-of-type:rounded-br-md last-of-type:rounded-bl-md"
          >
            <header className="flex items-center gap-2 mb-4">
              <Avatar.Root className="h-[40px] w-[40px] rounded-full inline-flex border-2 border-gray-200">
                <Avatar.Image
                  src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                  className="h-full w-full object-cover rounded-[inherit]"
                />
              </Avatar.Root>
              <div>
                <h2 className="font-bold -mb-1">Dane</h2>
                <span className="text-xs text-gray-500">2 Weeks Ago</span>
              </div>
            </header>
            <p className="text-gray-500 mb-2 text-sm">
              can we make sure that the earth is actually flat and rotating? I
              have my suspicions!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
