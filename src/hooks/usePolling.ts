import { useEffect } from 'react';

interface UsePollingOptions {
  enabled?: boolean;
}

/**
 * Custom hook for polling a callback function at a specified interval.
 * @param callback - Function to call at the specified interval.
 * @param interval - Polling interval in milliseconds.
 * @param options - Options object, can include `enabled`.
 */
const usePolling = (
  callback: () => void,
  interval: number,
  { enabled = true }: UsePollingOptions = {},
): void => {
  useEffect(() => {
    if (!enabled) return;

    // Immediately invoke the callback
    callback();

    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  }, [callback, interval, enabled]);
};

export default usePolling;
