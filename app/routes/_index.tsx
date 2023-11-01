import { Link, Form } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <Form className="w-full flex gap-2 mb-4">
        <label htmlFor="search" className="sr-only">
          Search remixed answers
        </label>
        <input
          type="search"
          name="q"
          autoFocus
          id="search"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Search Remixed Answers"
        />
        <button
          type="submit"
          className="shadow-sm bg-indigo-500 text-white px-4 rounded-md font-semibold hover:bg-indigo-600 duration-150 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 outline-none"
        >
          Search
        </button>
      </Form>
      <div className="[&>*]:border [&>*]:border-b-0">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="border-gray-200 p-4 first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:border-b last-of-type:rounded-br-md last-of-type:rounded-bl-md"
          >
            <header>
              <h2 className="font-bold mb-2 text-lg">
                <Link to="#" className="hover:underline">
                  some title lol
                </Link>
              </h2>
            </header>
            <p className="text-gray-500 mb-2 text-sm">
              can we make sure that the earth is actually flat and rotating? I
              have my suspicions!
            </p>
            <footer className="text-xs text-gray-500">
              <span>5 comments</span> &middot;{" "}
              <Link
                to="#"
                className="text-blue-500 hover:underline hover:text-blue-600 duration-150"
              >
                Science
              </Link>{" "}
              &middot; <span>2 Weeks Ago</span>
            </footer>
          </div>
        ))}
      </div>
    </div>
  );
}
