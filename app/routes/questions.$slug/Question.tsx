import { Link } from "@remix-run/react";
import { UserAvatar } from "./UserAvatar";
import { Icon } from "~/components/Icon";

interface QuestionProps {
  author: string;
  image: string;
  category: string;
  created_at: string;
  title: string;
  body?: string;
}

export default function Question(props: QuestionProps) {
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
    </header>
  );
}
