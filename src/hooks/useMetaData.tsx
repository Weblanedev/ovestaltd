//@refresh
'use client';
import brand_data from '@/data/brand-data';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface WrapperProps {
  children: React.ReactNode;
  pageTitle: string;
}
const MetaData: React.FC<WrapperProps> = ({ children, pageTitle }) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`${pageTitle} | ${brand_data.name} - Delicious Food At Your Doorstep`}</title>
        </Helmet>
        {children}
      </HelmetProvider>
    </>
  );
};

export default MetaData;
