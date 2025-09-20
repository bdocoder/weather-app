import { useContext, useEffect, useRef, useState } from "react";
import { useHasFocus } from "../lib/hooks";
import classNames from "classnames";
import unitsIcon from "../assets/images/icon-units.svg";
import arrowIcon from "../assets/images/icon-dropdown.svg";
import checkIcon from "../assets/images/icon-checkmark.svg";
import { weather } from "../lib/contexts";

function DropdownMenuButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={classNames(
        className,
        "px-8 py-10 rounded-8 cursor-pointer",
        "text-7 hover:bg-neutral-700",
        "min-w-max"
      )}
      {...props}
    />
  );
}

function UnitsGroup({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex flex-col gap-8">
      <span className="px-8 pt-6 text-8 text-neutral-300">{label}</span>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function UnitButton({
  isSelected,
  children,
  ...props
}: React.ComponentProps<"button"> & { isSelected: boolean }) {
  return (
    <button
      className={classNames(
        "flex gap-10 items-center",
        "px-8 py-10",
        "rounded-8 cursor-pointer",
        isSelected && "bg-neutral-700"
      )}
      {...props}
    >
      <span className="grow text-7 shrink-0 text-left">{children}</span>

      <img
        className={classNames(
          "size-[14px] mb-[3px]",
          isSelected || "opacity-0"
        )}
        src={checkIcon}
      />
    </button>
  );
}

function Separator() {
  return <div className="border-[0.5px] border-neutral-600"></div>;
}

export default function UnitsDropdown() {
  const {
    temperatureUnit,
    setTemperatureUnit,
    speedUnit,
    setSpeedUnit,
    precipitationUnit,
    setPrecipitationUnit,
  } = useContext(weather);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFocus] = useHasFocus(containerRef);
  const [measurementSystem, setMeasurementSystem] = useState<
    "metric" | "imperial"
  >("metric");

  useEffect(() => {
    if (
      temperatureUnit === "celsius" &&
      speedUnit === "kmh" &&
      precipitationUnit === "mm"
    )
      setMeasurementSystem("metric");
    else setMeasurementSystem("imperial");
  }, [temperatureUnit, speedUnit, precipitationUnit]);

  function openDropdown() {
    containerRef.current?.focus();
  }

  function switchToMetric() {
    setTemperatureUnit("celsius");
    setSpeedUnit("kmh");
    setPrecipitationUnit("mm");
  }

  function switchToImperial() {
    setTemperatureUnit("fahrenheit");
    setSpeedUnit("mph");
    setPrecipitationUnit("inch");
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        className={classNames(
          "cursor-pointer",
          "flex items-center gap-6",
          "px-10 py-8 rounded-6",
          "tablet:px-16 tablet:py-12 tablet:gap-10",
          "bg-neutral-800 hover:bg-neutral-700"
        )}
        onClick={openDropdown}
      >
        <div className="size-[14px] tablet:size-16 grid place-items-center">
          <img src={unitsIcon} />
        </div>
        <span className="text-[14px] font-[500] leading-[120%] tablet:text-7">
          Units
        </span>
        <div className="size-[9px] tablet:size-12 grid place-items-center">
          <img src={arrowIcon} />
        </div>
      </button>

      {hasFocus && (
        <div
          className={classNames(
            "box-border px-6 py-8 rounded-12 cursor-default",
            "border border-neutral-700 bg-neutral-800",
            "absolute top-[calc(100%+10px)] end-0 z-50 min-w-max",
            "flex flex-col gap-4",
            "animate-slide"
          )}
        >
          {measurementSystem === "metric" ? (
            <DropdownMenuButton onClick={switchToImperial}>
              Switch to Imperial
            </DropdownMenuButton>
          ) : (
            <DropdownMenuButton onClick={switchToMetric}>
              Switch to Metric
            </DropdownMenuButton>
          )}

          <UnitsGroup label="Temperature">
            <UnitButton
              onClick={() => setTemperatureUnit("celsius")}
              isSelected={temperatureUnit === "celsius"}
            >
              Celsius (°C)
            </UnitButton>
            <UnitButton
              onClick={() => setTemperatureUnit("fahrenheit")}
              isSelected={temperatureUnit === "fahrenheit"}
            >
              Fahrenheit (°F)
            </UnitButton>
          </UnitsGroup>

          <Separator />

          <UnitsGroup label="Wind Speed">
            <UnitButton
              onClick={() => setSpeedUnit("kmh")}
              isSelected={speedUnit === "kmh"}
            >
              km/h
            </UnitButton>
            <UnitButton
              onClick={() => setSpeedUnit("mph")}
              isSelected={speedUnit === "mph"}
            >
              mph
            </UnitButton>
          </UnitsGroup>

          <Separator />

          <UnitsGroup label="Precipitation">
            <UnitButton
              onClick={() => setPrecipitationUnit("mm")}
              isSelected={precipitationUnit === "mm"}
            >
              Millimeters (mm)
            </UnitButton>
            <UnitButton
              onClick={() => setPrecipitationUnit("inch")}
              isSelected={precipitationUnit === "inch"}
            >
              Inches (in)
            </UnitButton>
          </UnitsGroup>
        </div>
      )}
    </div>
  );
}
