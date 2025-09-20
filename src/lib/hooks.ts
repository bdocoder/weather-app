import { useEffect, useState } from "react";

export function useHasFocus<T extends HTMLElement>(
  ref: React.RefObject<T | null>
) {
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const handleFocusIn = () => {
      setHasFocus(true);
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (element && !element.contains(event.relatedTarget as Node)) {
        setHasFocus(false);
      }
    };

    if (
      element &&
      (element.contains(document.activeElement) ||
        element === document.activeElement)
    ) {
      setHasFocus(true);
    }

    element?.addEventListener("focusin", handleFocusIn);
    element?.addEventListener("focusout", handleFocusOut);

    return () => {
      element?.removeEventListener("focusin", handleFocusIn);
      element?.removeEventListener("focusout", handleFocusOut);
    };
  }, [ref]);

  return [hasFocus, setHasFocus] as const;
}
