import { useContext, useMemo, useRef, useState } from "react";
import arrowIcon from "../assets/images/icon-dropdown.svg";
import { useHasFocus } from "../lib/hooks";
import classNames from "classnames";
import { getWeekDays } from "../lib/utils";
import { weather } from "../lib/contexts";
import RandomWeatherIcon from "./random-weather-icon";

export default function HourlyForecast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useHasFocus(containerRef);
  const { data } = useContext(weather);
  const [currentDay, setCurrentDay] = useState(0);

  const temperatures = useMemo(
    () =>
      data?.hourly.temperature_2m
        .slice(currentDay * 24, (currentDay + 1) * 24)
        .map((temp, i) => ({
          timestamp: data.hourly.time[i],
          temperature: temp,
        })) ?? [],
    [currentDay, data?.hourly.temperature_2m, data?.hourly.time]
  );

  function openDropdown() {
    containerRef.current?.focus();
  }

  function handleSelect(i: number) {
    setCurrentDay(i);
    setHasFocus(false);
  }

  return (
    <div className="bg-neutral-800 rounded-20 px-16 py-20 tablet:p-24 flex flex-col gap-16 laptop:min-w-[380px]">
      <div className="flex items-center justify-between">
        <span className="text-5">Hourly forecast</span>

        <div className="relative" ref={containerRef}>
          <button
            className="px-16 py-8 flex gap-12 items-center rounded-8 bg-neutral-600 cursor-pointer"
            onClick={openDropdown}
          >
            <span>
              {Intl.DateTimeFormat("en", { weekday: "long" }).format(
                new Date(getWeekDays()[currentDay])
              )}
            </span>
            <img src={arrowIcon} className="size-12" />
          </button>

          {hasFocus && (
            <div
              className={classNames(
                "box-border p-8 rounded-12 cursor-default",
                "border border-neutral-700 bg-neutral-800",
                "absolute top-[calc(100%+10px)] end-0 z-50 min-w-[200px]",
                "flex flex-col gap-4",
                "animate-slide"
              )}
            >
              {getWeekDays().map((day, i) => (
                <button
                  key={day}
                  className={classNames(
                    "text-7 text-left",
                    "px-8 py-10 rounded-8 cursor-pointer",
                    currentDay === i ? "bg-neutral-700" : "hover:bg-neutral-700"
                  )}
                  onClick={() => handleSelect(i)}
                >
                  {Intl.DateTimeFormat("en", { weekday: "long" }).format(
                    new Date(day)
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={classNames(
          "max-h-[592px] overflow-auto flex flex-col gap-16 -mx-16 px-16",
          "[&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-thumb]:rounded-[100vh] [&::-webkit-scrollbar-thumb]:bg-neutral-700"
        )}
      >
        {Array.from(Array(24).keys()).map((i) => (
          <div
            key={currentDay * 24 + i}
            className="min-h-[60px] flex items-center gap-8 pl-12 pr-16 py-10 bg-neutral-700 box-border border border-neutral-600 rounded-8"
          >
            {data && (
              <>
                <RandomWeatherIcon
                  i={temperatures[i].temperature}
                  className="size-40"
                />

                <span className="text-5-medium grow">
                  {Intl.DateTimeFormat("en", { hour: "numeric" }).format(
                    new Date(temperatures[i].timestamp)
                  )}
                </span>

                <span className="text-7">
                  {Math.round(temperatures[i].temperature)}°
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
