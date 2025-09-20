import { useQuery } from "@tanstack/react-query";
import AppLayout from "./layouts/app-layout";
import AppTitle from "./components/app-title";
import Header from "./components/header";
import MainContent from "./components/main-content";
import SearchContainer from "./components/search-container";
import SearchInput from "./components/search-input";
import SearchButton from "./components/search-button";
import { useEffect, useState } from "react";
import { weather } from "./lib/contexts";
import UnitsDropdown from "./components/units-dropdown";
import WeatherInfo from "./components/weather-info";
import ContentContainer from "./components/content-container";
import LeftContent from "./components/left-content";
import DailyForecast from "./components/daily-forecast";
import HourlyForecast from "./components/hourly-forecast";
import { getWeekDays } from "./lib/utils";
import ErrorBoundary from "./components/error-boundary";
import ErrorPage from "./layouts/error-page";

export default function App() {
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");
  const [precipitationUnit, setPrecipitationUnit] =
    useState<PrecipitationUnit>("mm");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("kmh");
  const [city, setCity] = useState<City | null>({
    id: 360630,
    name: "Cairo",
    latitude: 30.06263,
    longitude: 31.24967,
    elevation: 23,
    feature_code: "PPLC",
    country_code: "EG",
    admin1_id: 360631,
    timezone: "Africa/Cairo",
    population: 9606916,
    country_id: 357994,
    country: "Egypt",
    admin1: "Cairo",
  });

  const { data } = useQuery({
    queryKey: ["api", city?.id, temperatureUnit, speedUnit, precipitationUnit],
    enabled: Boolean(city),
    queryFn() {
      return fetch(
        `https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=wind_speed_10m,precipitation,relative_humidity_2m,temperature_2m,apparent_temperature&wind_speed_unit=${speedUnit}&temperature_unit=${temperatureUnit}&precipitation_unit=${precipitationUnit}&start_date=${
          getWeekDays()[0]
        }&end_date=${getWeekDays()[6]}&latitude=${city?.latitude}&longitude=${
          city?.longitude
        }`
      ).then((res) => res.json() as Promise<Weather>);
    },
  });

  useEffect(() => {
    console.log(`Challenge by Frontend Mentor (https://www.frontendmentor.io?ref=challenge).
Coded by Abdullah Ahmad (https://github.com/bdocoder).`);
  }, []);

  return (
    <weather.Provider
      value={{
        city,
        setCity,
        data,
        temperatureUnit,
        setTemperatureUnit,
        precipitationUnit,
        setPrecipitationUnit,
        speedUnit,
        setSpeedUnit,
      }}
    >
      <AppLayout>
        <Header>
          <UnitsDropdown />
        </Header>

        <ErrorBoundary fallback={<ErrorPage />}>
          <AppTitle />
          <MainContent>
            <SearchContainer>
              <SearchInput />
              <SearchButton />
            </SearchContainer>

            {city ? (
              <ContentContainer>
                <LeftContent>
                  <WeatherInfo />
                  <DailyForecast />
                </LeftContent>

                <HourlyForecast />
              </ContentContainer>
            ) : (
              <span className="text-4 m-auto">No search result found!</span>
            )}
          </MainContent>
        </ErrorBoundary>
      </AppLayout>
    </weather.Provider>
  );
}
