import { createContext } from "react";

export const weather = createContext(null as never as WeatherContext);

declare global {
  type TemperatureUnit = "fahrenheit" | "celsius";
  type SpeedUnit = "kmh" | "mph";
  type PrecipitationUnit = "mm" | "inch";

  type City = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
  };

  type SearchResponse = {
    results?: City[];
  };

  type Weather = {
    current: {
      time: string;
      wind_speed_10m: number;
      precipitation: number;
      relative_humidity_2m: number;
      temperature_2m: number;
      apparent_temperature: number;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
    };
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
    };
  };

  type WeatherContext = {
    city: City | null;
    setCity(city: City | null): void;
    temperatureUnit: TemperatureUnit;
    setTemperatureUnit(unit: TemperatureUnit): void;
    speedUnit: SpeedUnit;
    setSpeedUnit(unit: SpeedUnit): void;
    precipitationUnit: PrecipitationUnit;
    setPrecipitationUnit(unit: PrecipitationUnit): void;
    data?: Weather;
  };
}
