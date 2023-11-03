import { UserAvatar } from "./UserAvatar";

interface CommentProps {
  avatar_url: string;
  username: string;
  body: string;
  created_at: string;
}

export function Comment(props: CommentProps) {
  return (
    <div className="border-gray-200 p-4 first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:border-b last-of-type:rounded-br-md last-of-type:rounded-bl-md">
      <header className="flex items-center gap-2 mb-4">
        <UserAvatar
          className="h-12 w-12"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        />
        <div>
          <h2 className="font-bold -mb-1">Dane</h2>
          <span className="text-xs text-gray-500">2 Weeks Ago</span>
        </div>
      </header>
      <p className="text-gray-500 mb-2 text-sm">
        can we make sure that the earth is actually flat and rotating? I have my
        suspicions!
      </p>
    </div>
  );
}
