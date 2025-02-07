//@refresh
'use client';
import React, { useEffect } from 'react';
import { animationCreate } from '@/utils/utils';
import BackToTop from '@/components/common/backToTop/BackToTop';
if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}
import FooterOne from './footer/FooterOne';
import HeaderOne from './header/HeaderOne';
interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);

  return (
    <>
      <BackToTop />
      <HeaderOne />
      {children}
      <FooterOne />
    </>
  );
};

export default Wrapper;
