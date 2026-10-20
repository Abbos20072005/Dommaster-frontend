import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/utils/constants';

const UZ_PHONE = /(?<!\d)\+?998[\s\-()]*\d{2}[\s\-()]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}(?!\d)/g;

/**
 * The company has one phone number. The texts that come from the admin panel (about, news,
 * articles, services) may hold old numbers: every Uzbek number in them becomes the main one.
 */
const MAIN_PHONE_TWICE = new RegExp(
  `${CONTACT_PHONE.replace(/[+()]/g, '\\$&')}(?:\\s*(?:&nbsp;)?[,;/]\\s*(?:&nbsp;)?${CONTACT_PHONE.replace(/[+()]/g, '\\$&')})+`,
  'g'
);

export const withMainPhone = (html: string | null | undefined) =>
  (html ?? '')
    .replace(/tel:\s*\+?998[\d\s\-()]{9,16}/gi, CONTACT_PHONE_HREF)
    .replace(UZ_PHONE, CONTACT_PHONE)
    // two old numbers became the same one: "A, A" is written once
    .replace(MAIN_PHONE_TWICE, CONTACT_PHONE);

/** The seller is "ENERGOSNAB" MChJ (D38, 15.10); the about text from the admin panel has the old company. */
export const withCurrentCompany = (html: string, locale: string) =>
  html
    .replace(
      /(?:ООО|OOO|MChJ)?\s*(?:&quot;|"|«|“)BUILDEX RETAIL GROUP(?:&quot;|"|»|”)(?:\s*MChJ)?/gi,
      locale === 'uz' ? '«ENERGOSNAB» MChJ' : 'ООО «ENERGOSNAB»'
    )
    .replace(/311798440/g, '308542198');
