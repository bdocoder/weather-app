import { useContext } from "react";
import { weather } from "../lib/contexts";
import classNames from "classnames";
import RandomWeatherIcon from "./random-weather-icon";

export default function DailyForecast() {
  const { data } = useContext(weather);

  return (
    <div className="flex flex-col gap-20">
      <span className="text-5">Daily forecast</span>

      <div className="grid grid-cols-3 gap-16 tablet:grid-cols-7">
        {Array.from(Array(7).keys()).map((i) => (
          <div
            key={i}
            className={classNames(
              "px-10 py-16 h-[165px] rounded-12",
              "box-border bg-neutral-800 border border-neutral-600",
              "flex flex-col items-center gap-16"
            )}
          >
            {data && (
              <>
                <span>
                  {Intl.DateTimeFormat("en", { weekday: "short" }).format(
                    new Date(data.daily.time[i])
                  )}
                </span>

                <RandomWeatherIcon
                  className="size-[60px]"
                  i={
                    (data.daily.temperature_2m_max[i] +
                      data.daily.temperature_2m_min[i]) /
                    2
                  }
                />

                <div className="flex justify-between gap-16 text-7 w-full">
                  <span>{data.daily.temperature_2m_max[i].toFixed()}°</span>
                  <span>{data.daily.temperature_2m_min[i].toFixed()}°</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
