import { useEffect, useRef } from "react";

// NOTE: keep PING_INTERVAL < backend INACTIVITY_TIMEOUT (dev-server.js)
const PING_INTERVAL = 60 * 1000; // ping every 60 seconds
const USER_ACTIVITY_TIMEOUT = 2 * 60 * 1000; // stop pinging after 2 min of no input

export function useActivityPing() {
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const markUserActive = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener("mousemove", markUserActive);
    window.addEventListener("keydown", markUserActive);
    window.addEventListener("click", markUserActive);
    window.addEventListener("scroll", markUserActive);
    window.addEventListener("touchstart", markUserActive);

    const ping = () => {
      const isVisible = document.visibilityState === "visible";
      const isUserActive = Date.now() - lastActivityRef.current < USER_ACTIVITY_TIMEOUT;

      if (isVisible && isUserActive) {
        fetch("/_ping", { method: "POST", keepalive: true }).catch(() => {});
      }
    };

    ping();
    const interval = setInterval(ping, PING_INTERVAL);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", markUserActive);
      window.removeEventListener("keydown", markUserActive);
      window.removeEventListener("click", markUserActive);
      window.removeEventListener("scroll", markUserActive);
      window.removeEventListener("touchstart", markUserActive);
    };
  }, []);
}
