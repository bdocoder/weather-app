import Logo from "../assets/images/logo.svg";

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <div className="flex justify-between w-full">
      <img className="h-[28px] tablet:h-40" src={Logo} />

      {children}
    </div>
  );
}
