export default function MainContent({ children }: React.PropsWithChildren) {
  return (
    <main className="flex flex-col gap-32 laptop:gap-48 w-full">
      {children}
    </main>
  );
}
