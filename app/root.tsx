import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import "~/css/tailwind.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "./services/auth.server";
import { UserAvatar } from "./routes/questions.$slug/UserAvatar";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return json(user);
}

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50">
        <Navbar user={user} />
        <main className="max-w-6xl mx-auto py-5">
          <Outlet />
        </main>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

interface NavbarProps {
  id: string;
  username: string;
}

function Navbar(props: NavbarProps | null) {
  const submit = useSubmit();

  return (
    <header className="py-4 px-20 bg-white shadow-sm border-b border-gray-200 flex justify-between items-baseline">
      <Link to="/" className="font-bold" aria-label="Go to search page">
        Remixed Answers
      </Link>
      <div className="flex items-center gap-4">
        {props.user ? (
          <>
            <Link
              to="/questions/new"
              className="hover:underline font-bold text-indigo-500 hover:text-indigo-600"
            >
              ask a question
            </Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="">
                <UserAvatar initial="D" className="h-10 w-10" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-white border border-gray-300 w-[200px] mt-2 rounded-md px-2 py-1.5">
                  <DropdownMenu.Item
                    disabled
                    className="text-gray-400 text-sm py-1.5"
                  >
                    <span className="px-2">{props.user.username}</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-[1px] bg-gray-200 m-[5px]" />
                  <DropdownMenu.Item className="text-gray-400 text-sm py-1.5 px-2 hover:bg-indigo-50 hover:outline-none rounded-sm hover:text-indigo-900">
                    <button
                      className="w-full text-left"
                      onClick={() =>
                        submit(null, {
                          method: "POST",
                          action: "/logout",
                          replace: true,
                        })
                      }
                    >
                      Logout
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </>
        ) : (
          <Link
            to="/login"
            className="hover:underline font-bold text-indigo-500"
            aria-label="Go to login page"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
