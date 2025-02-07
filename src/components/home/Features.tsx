import LocationIcon from '@/svg/LocationIcon';
import PaymentIcon from '@/svg/PaymentIcon';
// import ReturnIcon from '@/svg/ReturnIcon';
import ShippingIcon from '@/svg/ShippingIcon';
import SupportIcon from '@/svg/SupportIcon';
import React from 'react';

const Features = () => {
  return (
    <>
      <div className="features-area features-area2">
        <div className="container">
          <div className="hr1"></div>
          <div className="features-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="features-single">
                  <div className="irc-item">
                    <div className="irc-item-icon">
                      <ShippingIcon />
                    </div>
                    <div className="irc-item-content">
                      <div className="irc-item-heading">Free Shipping</div>
                      <p>On All Orders Over $49</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="features-single">
                  <div className="irc-item">
                    <div className="irc-item-icon">
                      <LocationIcon />
                    </div>
                    <div className="irc-item-content">
                      <div className="irc-item-heading">Delivered Anywhere</div>
                      <p>Within The Country</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="features-single">
                  <div className="irc-item">
                    <div className="irc-item-icon">
                      <PaymentIcon />
                    </div>
                    <div className="irc-item-content">
                      <div className="irc-item-heading">Secure Payment</div>
                      <p>100% Secure Guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="features-single">
                  <div className="irc-item">
                    <div className="irc-item-icon">
                      <SupportIcon />
                    </div>
                    <div className="irc-item-content">
                      <div className="irc-item-heading">Special Support</div>
                      <p>24/7 Dedicated Support</p>
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

export default Features;
