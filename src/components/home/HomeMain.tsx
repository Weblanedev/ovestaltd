//@refresh
'use client';

import React from 'react';

// heros
import HeroBanner1 from './HeroBanner1';
import HeroBanner2 from './HeroBanner2';
import HeroBanner3 from './HeroBanner3';

// import CategoryArea from './CategoryArea';
// import FeaturesArea from '../SharedComponents/FeaturesArea';
import SidebarMain from '../SharedComponents/Sidebars/SidebarMain';
import useGlobalContext from '@/hooks/use-context';
import CategoryArea1 from './CategoryArea1';
import CategoryArea3 from './CategoryArea3';
import CategoryBanner1 from './CategoryBanner1';
import CategoryBanner2 from './CategoryBanner2';
import CategoryArea2 from './CategoryArea2';
import Features from './Features';
import TestimonialArea from './TestimonialArea';
import BlogArea from './BlogArea';
import NewsLetterSection from './NewsLetterSection';
// import { layout } from '@/app/layout';
const HomeMain = () => {
  const { layout } = useGlobalContext();
  console.log({ layout });

  return (
    <>
      {layout.hero === 1 && <HeroBanner1 />}
      {layout.hero === 2 && <HeroBanner2 />}
      {layout.hero === 3 && <HeroBanner3 />}

      {layout.main.categoryBanner === 1 && <CategoryBanner1 />}
      {layout.main.categoryBanner === 2 && <CategoryBanner2 />}

      {layout.main.categoryArea === 1 && <CategoryArea1 />}
      {layout.main.categoryArea === 2 && <CategoryArea2 />}
      {layout.main.categoryArea === 3 && <CategoryArea3 />}

      {layout.main.hasTestimonials && <TestimonialArea />}
      {layout.main.hasBlog && <BlogArea />}
      {layout.main.hasNewsletter && <NewsLetterSection />}
      {layout.main.hasFeatures && <Features />}

      <SidebarMain />
    </>
  );
};

export default HomeMain;
