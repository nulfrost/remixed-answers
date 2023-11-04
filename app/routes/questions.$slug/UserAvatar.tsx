import * as Avatar from "@radix-ui/react-avatar";
import cx from "classnames";

interface UserAvatarProps {
  className?: string;
  initial: string;
}

export function UserAvatar(props: UserAvatarProps) {
  return (
    <Avatar.Root
      className={cx(
        `rounded-full inline-flex border-2 border-gray-200 items-center justify-center align-middle`,
        props.className
      )}
    >
      <Avatar.Fallback className="h-full w-full object-cover rounded-[inherit] flex items-center justify-center font-medium bg-indigo-50 text-indigo-900">
        {props.initial}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
