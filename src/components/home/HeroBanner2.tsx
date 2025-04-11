'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import 'swiper/css/bundle';
// import banner4 from '../../../public/assets/img/slider-img/banner-01.png';
import banner5 from '../../../public/assets/img/slider-img/banner-02.png';
// import banner6 from '../../../public/assets/img/slider-img/banner-03.png';
import bannerBg from '../../../public/assets/img/banner/computer_store.jpg';
import Link from 'next/link';
const HeroBanner2 = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active slide index

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex); // Update activeIndex state when slide changes
  };

  const sliderData = [
    {
      id: 1,
      bgImg: banner5,
      tagOne: 'Top Brands',
      tagTwo: 'Discover the Best in Computer Hardware',
    },
    // {
    //   id: 2,
    //   bgImg: banner4,
    //   tagOne: 'Expert Tech Support',
    //   tagTwo: 'Your Partner in Computer Solutions',
    // },
    // {
    //   id: 3,
    //   bgImg: banner6,
    //   tagOne: 'Custom Solutions',
    //   tagTwo: 'Tech Consulting Services for Your Business',
    // },
  ];
  return (
    <>
      <div className="banner-area banner-area-2 pos-rel">
        <div
          className="banner-bg-thumb"
          style={{
            backgroundImage: `url(${bannerBg.src})`,
            backgroundSize: 'cover',
            filter: 'brightness(0.7)',
          }}
        ></div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect={'fade'}
          onSlideChange={handleSlideChange}
          navigation={{
            nextEl: '.slider-button-prev',
            prevEl: '.slider-button-next',
          }}
          pagination={{
            el: '.slider2-pagination',
            clickable: true,
          }}
          // autoplay={{
          //   delay: 5000,
          // }}
          // loop={true}
        >
          {sliderData?.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                {/* Only render content if it's the active slide */}
                {index === activeIndex && (
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-xxl-7 col-xl-7 col-lg-7">
                        <div className="banner-content pos-rel mb-30 text-white">
                          <span className="banner-subtitle">
                            {item?.tagOne}
                          </span>
                          <h1 className="banner-title">{item?.tagTwo}</h1>
                          <div className="banner-btn">
                            <Link className="fill-btn" href="/contact">
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-xxl-5 col-xl-5 col-lg-5">
                        <div className="banner-thumb-wrapper pos-rel">
                          <div className="banner-thumb-2">
                            <Image src={item?.bgImg} alt="banner-4" />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="slider-nav d-none">
          <div className="slider-button-prev">
            <i className="fal fa-long-arrow-left"></i>
          </div>
          <div className="slider-button-next">
            <i className="fal fa-long-arrow-right"></i>
          </div>
        </div>
        <div className="slider2-pagination-container">
          <div className="container">
            <div className="slider-pagination slider2-pagination"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner2;
