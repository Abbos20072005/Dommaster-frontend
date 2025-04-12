import React from 'react';

import { HeaderBottom, HeaderMiddle, HeaderTop } from './components';

export const AppHeader = () => {
  return (
    <header className='bg-background hidden gap-3 md:block'>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </header>
  );
};
