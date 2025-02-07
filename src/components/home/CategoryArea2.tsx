import menu_data from '@/data/menu-data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import categoryImg1 from '../../../public/assets/img/category_banner/category-banner1.jpg';
import categoryImg2 from '../../../public/assets/img/category_banner/category-banner1.jpg';
import categoryImg3 from '../../../public/assets/img/category_banner/category-banner1.jpg';
import categoryImg4 from '../../../public/assets/img/category_banner/category-banner4.jpg';

const CategoryArea2 = () => {
  const categories = menu_data[1].submenus?.map((item, index) => {
    const categoryImg = [
      categoryImg1,
      categoryImg2,
      categoryImg3,
      categoryImg4,
    ][index % 4];
    return {
      id: item.id,
      category: item.title,
      categoryImg,
    };
  });

  return (
    <>
      <div className="category-area2 pb-120 mt-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="product-category2-wrapper">
                {categories?.map(item => (
                  <div
                    key={item.id}
                    className="product-category2-single pos-rel"
                  >
                    <div className="product-category-img">
                      {/* <Link href="/shop-sidebar-5-column"> */}
                      <Image
                        style={{ width: '100%', height: 'auto' }}
                        src={item?.categoryImg}
                        alt="product-img"
                      />
                      {/* </Link> */}
                    </div>
                    <div className="product-category-inner">
                      <div className="product-category-content">
                        <Link href="/contact" className="product-category">
                          {item?.category}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryArea2;
