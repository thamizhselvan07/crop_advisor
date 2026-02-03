import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to CropCadet',
      login: 'Login',
      register: 'Register',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      language: 'Language',
      submit: 'Submit',
      // Add more keys
    },
  },
  hi: {
    translation: {
      welcome: 'क्रॉपकैडेट में आपका स्वागत है',
      login: 'लॉग इन',
      register: 'रजिस्टर',
      name: 'नाम',
      email: 'ईमेल',
      password: 'पासवर्ड',
      language: 'भाषा',
      submit: 'सबमिट',
    },
  },
  ta: {
    translation: {
      welcome: 'க்ராப்கேடெட்டுக்கு வரவேற்கிறோம்',
      login: 'உள்நுழை',
      register: 'பதிவு செய்',
      name: 'பெயர்',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      language: 'மொழி',
      submit: 'சமர்ப்பி',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;