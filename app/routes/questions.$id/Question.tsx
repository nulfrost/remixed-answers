import { Link, useFetcher } from "@remix-run/react";
import { UserAvatar } from "./UserAvatar";
import { Icon } from "~/components/Icon";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "~/components/Button";
import { formatDistanceToNow } from "date-fns";

interface QuestionProps {
  author: {
    username: string;
  };
  category: {
    name: string | null;
  };
  created_at: string | null;
  title: string;
  body?: string;
}

export default function Question(props: QuestionProps) {
  const [answerDialogOpen, setDialogAnswerOpen] = useState(false);
  const fetcher = useFetcher();
  return (
    <header className="border border-gray-200 px-8 py-6 rounded-md mb-4 bg-white">
      <div className="flex flex-col">
        <h1
          className={`text-2xl font-bold order-1 ${props.body ? "" : "mb-4"}`}
        >
          {props.title}
        </h1>
        <div className="flex items-center gap-2 mb-2 order-0">
          <UserAvatar className="h-12 w-12" initial="D" />
          <div>
            <span className="font-semibold">{props.author.username}</span>
            <span className="text-sm text-gray-500 block">
              asked in{" "}
              <Link
                to="#"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                {props.category.name}
              </Link>{" "}
              &middot;{" "}
              <time dateTime={props.created_at.toString()}>
                {formatDistanceToNow(new Date(props.created_at as string), {
                  addSuffix: true,
                })}
              </time>
            </span>
          </div>
        </div>
      </div>
      {props.body ? <p className="mb-4">{props.body}</p> : null}
      <div className="flex gap-3">
        <button
          type="button"
          className="bg-indigo-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-indigo-600 duration-150 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 outline-none flex items-center gap-1"
          onClick={() => setDialogAnswerOpen(true)}
        >
          <Icon name="message-circle" className="h-4 w-4" />
          <span>Answer</span>
        </button>
        <button
          aria-label="Save question to favourites"
          type="button"
          className="hover:bg-indigo-50 duration-150 px-4 py-1.5 rounded-md text-gray-500 hover:text-indigo-900 focus:bg-indigo-50 focus:text-indigo-900 flex gap-1 items-center"
        >
          <Icon name="bookmark" className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
      <Dialog.Root open={answerDialogOpen}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/25 fixed inset-0" />
          <Dialog.Content className="fixed px-4 py-4 top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none border border-gray-300">
            <div>
              <Dialog.Title asChild>
                <h2 className="font-bold text-lg">{props.title}</h2>
              </Dialog.Title>
              {props.body ? (
                <Dialog.Description className="text-gray-500">
                  {props.body}
                </Dialog.Description>
              ) : null}
            </div>
            <div className="border border-gray-200 w-full mb-4 mt-4"></div>
            <fetcher.Form method="post">
              <label htmlFor="answer" className="sr-only">
                answer
              </label>
              <textarea
                rows={4}
                placeholder="Answer Dane's question"
                className="w-full h-full mb-2 resize-none block border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md"
              />
              <Button className="w-full">Answer Question</Button>
            </fetcher.Form>
            <Dialog.Close
              className="absolute top-2 right-2"
              onClick={() => setDialogAnswerOpen(false)}
            >
              <Icon name="x" className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
