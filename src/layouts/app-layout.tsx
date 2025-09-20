import classNames from "classnames";

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className={classNames(
        "min-h-screen flex flex-col items-center gap-48 laptop:gap-64",
        "p-16 pb-48 tablet:p-24 tablet:pb-80 laptop:pt-48 laptop:px-112 laptop:pb-80",
        "bg-neutral-900 text-neutral-0"
      )}
    >
      {children}
    </div>
  );
}
