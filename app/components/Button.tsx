import { ComponentProps } from "react";
import cx from "classnames";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cx(
        "bg-indigo-500 text-white px-4 py-1.5 rounded-md font-semibold hover:bg-indigo-600 duration-150 focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 outline-none",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
