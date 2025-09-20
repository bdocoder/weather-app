import classNames from "classnames";
import { useContext } from "react";
import { weather } from "../lib/contexts";

export default function SearchContainer({ children }: React.PropsWithChildren) {
  const { setCity } = useContext(weather);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get("search");
    const res = (await (
      await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`
      )
    ).json()) as SearchResponse;
    setCity(res.results?.[0] ?? null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(
        "flex flex-col tablet:flex-row",
        "gap-12 tablet:gap-16",
        "w-full laptop:max-w-[41rem] laptop:self-center"
      )}
    >
      {children}
    </form>
  );
}
