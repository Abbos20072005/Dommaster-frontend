import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/utils/constants';

const UZ_PHONE = /(?<!\d)\+?998[\s\-()]*\d{2}[\s\-()]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}(?!\d)/g;

/**
 * The company has one phone number. The texts that come from the admin panel (about, news,
 * articles, services) may hold old numbers: every Uzbek number in them becomes the main one.
 */
export const withMainPhone = (html: string | null | undefined) =>
  (html ?? '')
    .replace(/tel:\s*\+?998[\d\s\-()]{9,16}/gi, CONTACT_PHONE_HREF)
    .replace(UZ_PHONE, CONTACT_PHONE);
