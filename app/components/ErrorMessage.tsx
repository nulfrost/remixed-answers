import { ComponentProps } from "react";

interface ErrorMessageProps extends ComponentProps<"span"> {
  message: {
    id?: string;
    error?: string;
  };
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <span
      id={`${props.message.id}-error`}
      className="text-sm text-red-500 mb-2 inline-block"
    >
      {props.message.error}
    </span>
  );
}
