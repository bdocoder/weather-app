export default function LeftContent({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-32 w-full laptop:max-w-[800px]">
      {children}
    </div>
  );
}
