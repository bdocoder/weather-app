import { useContext } from "react";
import { weather } from "../lib/contexts";
import classNames from "classnames";
import RandomWeatherIcon from "./random-weather-icon";

function DetailCard({
  label,
  value,
  unit,
  hasSpaceAfterValue = true,
}: {
  label: string;
  value: React.ReactNode;
  unit: string;
  hasSpaceAfterValue?: boolean;
}) {
  return (
    <div className="p-20 flex flex-col gap-24 grow rounded-12 bg-neutral-800 box-border border border-neutral-600">
      <span className="text-6 text-neutral-200">{label}</span>

      <span className="text-3">
        {value === null || value === undefined
          ? "–"
          : `${value}${hasSpaceAfterValue ? " " : ""}${unit}`}
      </span>
    </div>
  );
}

export default function WeatherInfo() {
  const { city, data, speedUnit, precipitationUnit } = useContext(weather);

  if (!city) return null;

  return (
    <div className="flex flex-col gap-20 laptop:gap-32">
      <div
        className={classNames(
          "px-24 py-80 rounded-20 h-[286px]",
          "flex flex-col tablet:flex-row justify-between items-center gap-16",
          "bg-center bg-cover",
          data
            ? "bg-[url(/bg-today-small.svg)] tablet:bg-[url(/bg-today-large.svg)]"
            : "bg-neutral-700"
        )}
      >
        {data ? (
          <>
            <div className="flex flex-col items-center gap-12 -mt-40 tablet:mt-0">
              <span className="text-4">
                {city.country}, {city.name}
              </span>

              <span className="text-6">
                {Intl.DateTimeFormat("en", { dateStyle: "long" }).format(
                  new Date(data?.current.time ?? Date.now())
                )}
              </span>
            </div>

            <div className="flex gap-20 -mb-40 tablet:mb-0 items-center justify-between">
              <div className="size-[120px] grid place-items-center">
                <RandomWeatherIcon i={data.current.temperature_2m} />
              </div>

              <div className="text-1 italic">
                {Math.round(data?.current.temperature_2m ?? 20)}°
              </div>
            </div>
          </>
        ) : (
          <span className="m-auto text-6 text-neutral-200">Loading...</span>
        )}
      </div>

      <div className="grid grid-cols-2 tablet:grid-cols-4 gap-16 tablet:gap-20 laptop:gap-24">
        <DetailCard
          label="Feels Like"
          value={data?.current.apparent_temperature}
          unit="°"
          hasSpaceAfterValue={false}
        />
        <DetailCard
          label="Humidity"
          value={data?.current.relative_humidity_2m}
          unit="%"
          hasSpaceAfterValue={false}
        />
        <DetailCard
          label="Wind"
          value={data?.current.wind_speed_10m}
          unit={speedUnit === "kmh" ? "km/h" : "mph"}
        />
        <DetailCard
          label="Precipitation"
          value={data?.current.precipitation}
          unit={precipitationUnit === "mm" ? "mm" : "in"}
        />
      </div>
    </div>
  );
}
