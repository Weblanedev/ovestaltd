import brand_data from '@/data/brand-data';
import React from 'react';

const ContactMap = () => {
  return (
    <>
      <div className="contact-map-area mb-120">
        <div className="container container-small">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-map-wrapper">
                <iframe src={brand_data.map}></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMap;
