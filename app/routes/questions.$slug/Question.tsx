import { Link } from "@remix-run/react";
import { UserAvatar } from "./UserAvatar";

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
    <div className="border border-gray-200 px-8 py-6 rounded-md shadow-sm mb-4">
      <div className="flex items-center gap-2 mb-2">
        <UserAvatar
          size="50"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        />
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
      <h1 className="text-2xl font-bold mb-4">
        Can wall tiles be used on floors?
      </h1>
      <div className="space-x-4">
        <button
          type="button"
          className="bg-indigo-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-indigo-600 duration-150 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 outline-none"
        >
          Answer
        </button>
        <button
          type="button"
          className="hover:bg-indigo-50 duration-150 px-4 py-1.5 rounded-md text-gray-500 hover:text-indigo-900 focus:bg-indigo-50 focus:text-indigo-900"
        >
          Save
        </button>
      </div>
    </div>
  );
}
