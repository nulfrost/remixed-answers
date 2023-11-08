import { UserAvatar } from "./UserAvatar";

interface CommentProps {
  id: number;
  created_at: string | null;
  content: string;
  author: {
    username: string;
  };
}

export function Comment(props: CommentProps) {
  return (
    <li className="border-gray-200 bg-white p-4 first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:border-b last-of-type:rounded-br-md last-of-type:rounded-bl-md">
      <article>
        <header className="flex items-center gap-2 mb-4">
          <UserAvatar className="h-10 w-10" initial="D" />
          <div>
            <h2 className="font-bold -mb-1">{props.author.username}</h2>
            <span className="text-xs text-gray-500">{props.created_at}</span>
          </div>
        </header>
        <p className="text-gray-500 mb-2 text-sm">{props.content}</p>
      </article>
    </li>
  );
}
