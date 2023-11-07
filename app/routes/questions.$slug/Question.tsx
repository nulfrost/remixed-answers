import { Link, useFetcher } from "@remix-run/react";
import { UserAvatar } from "./UserAvatar";
import { Icon } from "~/components/Icon";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "~/components/Button";

interface QuestionProps {
  author: string;
  image: string;
  category: string;
  created_at: string;
  title: string;
  body?: string;
}

export default function Question(props: QuestionProps) {
  const [answerDialogOpen, setDialogAnswerOpen] = useState(false);
  const fetcher = useFetcher();
  return (
    <header className="border border-gray-200 px-8 py-6 rounded-md mb-4 bg-white">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4 order-1">
          Can wall tiles be used on floors?
        </h1>
        <div className="flex items-center gap-2 mb-2 order-0">
          <UserAvatar className="h-12 w-12" initial="D" />
          <div>
            <span className="font-semibold">Dane</span>
            <p className="text-sm text-gray-500">
              asked in{" "}
              <Link
                to="#"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                science
              </Link>{" "}
              &middot; 2 days ago
            </p>
          </div>
        </div>
      </div>
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
            <div className="">
              <Dialog.Title asChild>
                <h2 className="font-bold text-lg">
                  Can wall tiles be used on floors?
                </h2>
              </Dialog.Title>
              <Dialog.Description className="text-gray-500">
                pls respond
              </Dialog.Description>
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
