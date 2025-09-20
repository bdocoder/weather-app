import errorIcon from "../assets/images/icon-error.svg";
import retryIcon from "../assets/images/icon-retry.svg";

export default function ErrorPage() {
  function reload() {
    location.reload();
  }

  return (
    <div className="flex flex-col items-center gap-24 py-40">
      <img className="size-[50px]" src={errorIcon} />

      <span className="text-2">Something went wrong</span>
      <span className="text-5-medium">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </span>

      <button
        className="flex gap-10 rounded-8 bg-neutral-700 px-16 py-12 cursor-pointer"
        onClick={reload}
      >
        <img className="size-16" src={retryIcon} />
        <span className="text-7">Retry</span>
      </button>
    </div>
  );
}
