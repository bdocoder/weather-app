import { useContext, useRef, useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";
import { useQuery } from "@tanstack/react-query";
import { useHasFocus } from "../lib/hooks";
import classNames from "classnames";
import { weather } from "../lib/contexts";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useHasFocus(containerRef);
  const [search, setSearch] = useState("");
  const { setCity } = useContext(weather);

  const { data, isPending } = useQuery({
    queryKey: ["search", search],
    queryFn() {
      return fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=16&language=en&format=json`
      ).then((res) => res.json() as Promise<SearchResponse>);
    },
    enabled: Boolean(search),
  });

  function focusSearchInput() {
    inputRef.current?.focus();
  }

  function handleSelect(result: City) {
    setCity(result);
    setHasFocus(false);
    setSearch("");
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-16 px-24 py-16 bg-neutral-800 hover:bg-neutral-700 rounded-12 cursor-text grow relative"
      onClick={focusSearchInput}
    >
      <img className="w-24" src={searchIcon} />
      <input
        className="text-neutral-0 placeholder:text-5-medium placeholder:text-neutral-200 h-24 grow focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
        name="search"
        id="search"
        placeholder="Search for a place..."
      />

      {(data?.results?.length || isPending) && search && hasFocus && (
        <div
          className={classNames(
            "overflow-auto box-border p-8 rounded-12 cursor-default",
            "box-border border border-neutral-700 bg-neutral-800",
            "absolute top-[calc(100%+10px)] left-0 right-0",
            "flex flex-col gap-4",
            "max-h-[300px]"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {isPending && (
            <div className="flex items-center gap-10 px-8 py-10">
              <img className="size-20 animate-spin" src={loadingIcon} />
              <span className="text-7">Search in progress</span>
            </div>
          )}
          {data?.results?.map((result) => (
            <button
              className="box-border cursor-pointer border border-transparent hover:border-neutral-600 hover:bg-neutral-700 px-8 py-10 rounded-8 text-7 text-neutral-0 text-left"
              key={result.id}
              onClick={() => handleSelect(result)}
            >
              <span>{result.name}</span>
              <span className="ml-8 opacity-65">({result.timezone})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
