import React from 'react';

import { HeaderMiddle, HeaderTop } from './components';

export const AppHeader = () => {
  return (
    <header className='bg-background sticky inset-x-0 -top-11 z-50 hidden gap-3 md:-top-8 md:block'>
      <HeaderTop />
      <HeaderMiddle />
    </header>
  );
};
