import * as Avatar from "@radix-ui/react-avatar";
import cx from "classnames";

interface UserAvatarProps {
  className: string;
  src: string;
}

export function UserAvatar(props: UserAvatarProps) {
  return (
    <Avatar.Root
      className={cx(
        `rounded-full inline-flex border-2 border-gray-200`,
        props.className
      )}
    >
      <Avatar.Image
        src={props.src}
        className="h-full w-full object-cover rounded-[inherit]"
      />
    </Avatar.Root>
  );
}
