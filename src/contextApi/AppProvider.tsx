'use client';
import React, { createContext, useEffect, useState } from 'react';
import { AppContextType, Layout } from '@/interFace/interFace';
import { usePathname } from 'next/navigation';
export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [scrollDirection, setScrollDirection] = useState('up');
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [sideCartOpen, setSideCartOpen] = useState<boolean>(false);
  const [sideFilterOpen, setSideFilterOpen] = useState<boolean>(false);
  const [sideWishlistOpen, setSideWishlistOpen] = useState<boolean>(false);
  const [niceSelectData, setNiceSelectData] = useState<string>('no-data');
  const [dynamicId, setDynamicId] = useState<number>(1);
  const [selectData, setSelectData] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterColor, setFilterColor] = useState<string>('');
  const [filterSearch, setFilterSearch] = useState<string>('');
  const [filterRating, setFilterRating] = useState<number>(0);
  const [filterRange, setFilterRange] = useState<number[]>([]);
  const [totalShowingProduct, settotalShowingProduct] = useState<number>(0);
  const [filterBrand, setFilterBrand] = useState<string[]>([]);
  const [filterSize, setFilterSize] = useState<string[]>([]);
  const [modalData, setModalData] = useState<any>({});
  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const layout: Layout = {
    header: {
      type: 1,
      hasBannerAd: false, // TODO
    },
    hero: 2,
    main: {
      //   order:'',
      categoryBanner: 2,
      // categoryArea: 1,

      hasTestimonials: false,
      hasNewsletter: false,
      hasBlog: false,
      hasFeatures: false,
    },
    footer: {
      type: 1,
      // level: 1,
      hasNewsletter: false, // TODO
    },
  };

  useEffect(() => {
    setSelectData('');
    setFilterType('');
    setFilterCategory('');
    setFilterColor('');
    setFilterSearch('');
    setFilterRating(0);
    setFilterRange([]);
    setFilterBrand([]);
    setFilterSize([]);
  }, [pathName]);

  const contextValue: AppContextType = {
    dynamicId,
    setDynamicId,
    scrollDirection,
    setScrollDirection,
    setModalData,
    modalData,
    filterType,
    setFilterType,
    toggleSideMenu,
    sideMenuOpen,
    setSideMenuOpen,
    sideCartOpen,
    setSideCartOpen,
    sideWishlistOpen,
    setSideWishlistOpen,
    filterCategory,
    setFilterCategory,
    filterBrand,
    setFilterBrand,
    filterColor,
    setFilterColor,
    filterSize,
    setFilterSize,
    filterRating,
    setFilterRating,
    filterSearch,
    setFilterSearch,
    sideFilterOpen,
    setSideFilterOpen,
    selectData,
    setSelectData,
    totalShowingProduct,
    settotalShowingProduct,
    filterRange,
    setFilterRange,
    niceSelectData,
    setNiceSelectData,
    layout,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
