/**
 * A phone by its User-Agent (the smartphone bots, Googlebot and Yandex among them, send "Mobile").
 * Only a first guess for the server render, to send one layout instead of both (BLD-461, F6): in
 * the browser the width of the screen decides.
 */
export const isPhoneUserAgent = (userAgent: string | null) =>
  !!userAgent && /Mobi|Android|iPhone|iPod/i.test(userAgent);
