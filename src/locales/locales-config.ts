// ----------------------------------------------------------------------

export const fallbackLng = 'th';
export const languages = ['en', 'th'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export type LanguageValue = (typeof languages)[number];

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  th: {
    success: 'เปลี่ยนภาษาสำเร็จ!',
    error: 'พบข้อผิดพลาด!',
    loading: 'กำลังเปลี่ยนภาษา...',
  },
};
