export default function ContentContainer({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="flex flex-col justify-center laptop:flex-row gap-32">
      {children}
    </div>
  );
}
