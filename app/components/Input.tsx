import { ComponentProps } from "react";
import cx from "classnames";

export function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={cx(
        "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
        props.className,
      )}
    />
  );
}
