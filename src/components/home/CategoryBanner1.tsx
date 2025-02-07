import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import banner1 from '../../../public/assets/img/category_banner/category-banner1.jpg';
import banner2 from '../../../public/assets/img/category_banner/category-banner2.jpg';
import banner3 from '../../../public/assets/img/category_banner/category-banner3.jpg';
import banner4 from '../../../public/assets/img/category_banner/category-banner4.jpg';
import menu_data from '@/data/menu-data';

const CategoryBanner1 = () => {
  const banners = [
    {
      // img: '/assets/img/category_banner/household_stuff.jpg',
      title: menu_data[1].submenus?.[0].title,
      desc: 'Discover the latest collection of household items',
    },
    {
      // img: '/assets/img/category_banner/parenting.png',
      title: menu_data[1].submenus?.[1].title,
      desc: 'Explore our collection of parenting essentials',
    },
    {
      // img: '/assets/img/category_banner/tools.png',
      title: menu_data[1].submenus?.[2].title,
      desc: 'Browse our selection of tools and gadgets',
    },
    {
      // img: '/assets/img/category_banner/household_items.jpg',
      title: menu_data[1].submenus?.[3].title,
      desc: 'Find the perfect home decor for your needs',
    },
  ];

  return (
    <>
      <div className="category-banner-area pt-30">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="category-banner-single mb-30 pos-rel">
                <div className="category-banner-img">
                  <Image
                    style={{ width: '100%', height: 'auto' }}
                    src={banner1}
                    alt="banner-img"
                  />
                </div>
                <div className="category-banner-inner">
                  <div className="category-banner-content">
                    <Link href="/contact" className="product-category">
                      {banners[0].title}
                    </Link>
                    <p className="category-short-desc">{banners[0].desc}</p>
                    <Link href="/contact" className="border-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 order-xl-3">
              <div className="category-banner-single mb-30 pos-rel">
                <div className="category-banner-img">
                  <Image
                    style={{ width: '100%', height: 'auto' }}
                    src={banner4}
                    alt="banner-img"
                  />
                </div>
                <div className="category-banner-inner">
                  <div className="category-banner-content">
                    <Link href="/contact" className="product-category">
                      {banners[1].title}
                    </Link>
                    <p className="category-short-desc">{banners[1].desc}</p>
                    <Link href="/contact" className="border-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 order-xl-2">
              <div className="row">
                <div className="col-xl-12 col-lg-6 col-md-6">
                  <div className="category-banner-single mb-30 pos-rel">
                    <div className="category-banner-img">
                      <Image
                        style={{ width: '100%', height: 'auto' }}
                        src={banner2}
                        alt="banner-img"
                      />
                    </div>
                    <div className="category-banner-inner align-items-end">
                      <div className="category-banner-content">
                        <Link href="/contact" className="product-category">
                          {banners[2].title}
                        </Link>
                        <p className="category-short-desc">{banners[2].desc}</p>
                        <Link href="/contact" className="border-btn">
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-6 col-md-6">
                  <div className="category-banner-single mb-30 pos-rel">
                    <div className="category-banner-img">
                      <Image
                        style={{ width: '100%', height: 'auto' }}
                        src={banner3}
                        alt="banner-img"
                      />
                    </div>
                    <div className="category-banner-inner justify-content-end">
                      <div className="category-banner-content">
                        <Link href="/contact" className="product-category">
                          {banners[3].title}
                        </Link>
                        <p className="category-short-desc">{banners[3].desc}</p>
                        <Link href="/contact" className="border-btn">
                          Shop Now
                        </Link>
                      </div>
                    </div>
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

export default CategoryBanner1;
