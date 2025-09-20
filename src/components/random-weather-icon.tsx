import drizzleIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import overcastIcon from "../assets/images/icon-overcast.webp";
import cloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import rainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcon from "../assets/images/icon-storm.webp";
import sunnyIcon from "../assets/images/icon-sunny.webp";

export default function RandomWeatherIcon({
  i,
  ...props
}: { i?: number } & React.ComponentProps<"img">) {
  const icons = [
    drizzleIcon,
    fogIcon,
    overcastIcon,
    cloudyIcon,
    rainIcon,
    snowIcon,
    stormIcon,
    sunnyIcon,
  ];

  const iconIndex =
    Math.floor(i ?? Math.random() * icons.length) % icons.length;

  return <img key={i} src={icons[iconIndex]} {...props} />;
}
