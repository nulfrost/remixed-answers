import * as Avatar from "@radix-ui/react-avatar";

interface UserAvatarProps {
  size: string;
  src: string;
}

export function UserAvatar(props: UserAvatarProps) {
  return (
    <Avatar.Root
      className={`h-[${props.size}px] w-[${props.size}px] rounded-full inline-flex border-2 border-gray-200`}
    >
      <Avatar.Image
        src={props.src}
        className="h-full w-full object-cover rounded-[inherit]"
      />
    </Avatar.Root>
  );
}
