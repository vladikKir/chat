import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'errorPage' });

  return (
    <div className="text-center" id="error-page" style={{ padding: '20px' }}>
      <img src="/pictures/error_emoji.svg" alt="" width="50%" height="50%" />
      <h1>{t('header')}</h1>
    </div>
  );
};

export default ErrorPage;
