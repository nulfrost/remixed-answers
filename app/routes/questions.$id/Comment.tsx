import { UserAvatar } from "./UserAvatar";

interface CommentProps {
  username: string;
  body: string;
  created_at: string;
}

export function Comment(props: CommentProps) {
  return (
    <li className="border-gray-200 bg-white p-4 first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:border-b last-of-type:rounded-br-md last-of-type:rounded-bl-md">
      <article>
        <header className="flex items-center gap-2 mb-4">
          <UserAvatar className="h-10 w-10" initial="D" />
          <div>
            <h2 className="font-bold -mb-1">Dane</h2>
            <span className="text-xs text-gray-500">2 Weeks Ago</span>
          </div>
        </header>
        <p className="text-gray-500 mb-2 text-sm">
          can we make sure that the earth is actually flat and rotating? I have
          my suspicions!
        </p>
      </article>
    </li>
  );
}
