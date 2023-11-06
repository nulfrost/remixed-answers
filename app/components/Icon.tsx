import { type SVGProps } from "react";
import spriteHref from "~/app/components/icons/sprite.svg";
import { type IconName } from "~/icons/names";

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
