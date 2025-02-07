import React from 'react';

import bannerOne from '../../../public/assets/img/category_banner/abstract.jpg';
// import bannerTwo from '../../../public/assets/img/category_banner/category-banner6.jpg';
import Image from 'next/image';
import Link from 'next/link';

const CategoryBanner2 = () => {
  return (
    <>
      <div className="category-banner-area pt-30">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="category-banner-single category-banner2 mb-30 pos-rel">
                <div className="category-banner-img">
                  <Image
                    style={{
                      width: '100%',
                      height: 'auto',
                      filter: 'opacity(60%)',
                    }}
                    src={bannerOne}
                    alt="banner-img"
                  />
                </div>
                <div className="category-banner-inner">
                  <div className="category-banner-content">
                    <Link href="/contact" className="product-category">
                      <span>Computer </span>Softwares
                    </Link>
                    <p className="category-short-desc">
                      Starts from : <span> &#8358;15,000</span>
                    </p>
                    <Link href="/contact" className="border-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div className="category-banner-single category-banner2 mb-30 pos-rel">
                <div className="category-banner-img">
                  <Image
                    style={{
                      width: '100%',
                      height: 'auto',
                      filter: 'opacity(60%)',
                    }}
                    src={bannerOne}
                    alt="banner-img"
                  />
                </div>
                <div className="category-banner-inner">
                  <div className="category-banner-content">
                    <Link
                      href="/shop-sidebar-5-column"
                      className="product-category"
                    >
                      <span>Hot Exclusive</span>
                      Offer on Computers
                    </Link>
                    <p className="category-short-desc">
                      <span>15%</span> Instant Discount after consulting
                    </p>
                    <Link href="/shop-sidebar-5-column" className="border-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBanner2;
