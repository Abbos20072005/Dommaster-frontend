/** 13–19 digits in a row, with spaces or dashes between the groups: a bank card number. */
const CARD_NUMBER = /(?<!\d)(?:\d[ -]?){12,18}\d(?!\d)/g;

/** "sms 123456", "код: 4821": the digits after the word are a one-time code. */
const SMS_CODE = /((?:sms|смс|kod|код|code)\D{0,12})(\d{4,6})(?!\d)/gi;

/**
 * The text of a question without a card number or an SMS code ("8600 •••• •••• ••••"): the
 * assistant must never get them. `masked` tells the panel to warn the customer.
 */
export const maskSensitive = (text: string) => {
  let masked = false;

  const withoutCards = text.replace(CARD_NUMBER, (match) => {
    const digits = match.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return match;
    masked = true;
    return `${digits.slice(0, 4)} •••• •••• ••••`;
  });

  const withoutCodes = withoutCards.replace(SMS_CODE, (_, word: string, digits: string) => {
    masked = true;
    return `${word}${'•'.repeat(digits.length)}`;
  });

  return { text: withoutCodes, masked };
};
