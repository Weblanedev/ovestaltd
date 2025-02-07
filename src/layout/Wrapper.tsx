//@refresh
'use client';
import React, { useEffect } from 'react';
import { animationCreate } from '@/utils/utils';
import BackToTop from '@/components/common/backToTop/BackToTop';
if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

// headers
import HeaderOne from './header/HeaderOne';
import HeaderTwo from './header/HeaderTwo';
import HeaderThree from './header/HeaderThree';

// footers
import FooterOne from './footer/FooterOne';
import FooterTwo from './footer/FooterTwo';

import useGlobalContext from '@/hooks/use-context';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);

  const { layout } = useGlobalContext();

  return (
    <>
      <BackToTop />

      {layout.header.type === 1 && <HeaderOne />}
      {layout.header.type === 2 && <HeaderTwo />}
      {layout.header.type === 3 && <HeaderThree />}

      {children}

      {layout.footer.type === 1 && <FooterOne />}
      {layout.footer.type === 2 && <FooterTwo />}
    </>
  );
};

export default Wrapper;
