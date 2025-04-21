import clsx from "clsx";
import Image from "next/image";

export function GridTileImage({
  isInteractive = true,
  active,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-[#96c7ed] dark:bg-black",
        {
          "border-2 border-[#96c7ed]": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx(
            "relative h-full w-full object-cover object-center ",
            {
              "transition duration-300 ease-in-out group-hover:scale-105":
                isInteractive,
            }
          )}
          {...props}
        />
      ) : null}
    </div>
  );
}
