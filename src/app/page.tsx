//@refresh
import HomeMain from '@/components/home/HomeMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/Wrapper';
import React from 'react';

const Home = () => {
  return (
    <MetaData pageTitle="Home">
      <Wrapper>
        <main>
          <HomeMain />
        </main>
      </Wrapper>
    </MetaData>
  );
};

export default Home;
