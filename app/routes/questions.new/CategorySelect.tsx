import { useFetcher } from "@remix-run/react";
import { ComponentProps, useEffect } from "react";
import { loader } from "~/routes/resources.categories";
import cx from "classnames";

export function CategorySelect(props: ComponentProps<"select">) {
  const categoryFetcher = useFetcher<typeof loader>();
  // is this weird?
  useEffect(() => {
    categoryFetcher.load("/resources/categories");
  }, []);
  return (
    <select
      {...props}
      className={cx(
        "block rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full",
        props.className,
      )}
    >
      <>
        <option disabled selected value="">
          Select a category
        </option>
        {categoryFetcher.data?.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </>
    </select>
  );
}
