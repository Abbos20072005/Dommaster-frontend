const STORAGE_KEY = 'device_id';

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

/**
 * An id of this browser for the funnel events and the guest counters (`X-Device-Id`): made once
 * and kept in localStorage, so every request of a guest carries the same one. It holds no name,
 * phone or address. Empty on the server (no browser, no storage).
 */
export const getDeviceId = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = newId();
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    // storage blocked (private mode): an id for this page only
    return (window.__deviceId ??= newId());
  }
};

declare global {
  interface Window {
    __deviceId?: string;
  }
}
