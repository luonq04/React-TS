import React from "react";

const Service = () => {
  return (
    <section className="services">
      <div className="container-fluid">
        <div className="service-list">
          <div className="service-item">
            <img src="/cup.svg" className="service__image" />
            <div className="service-info">
              <h4 className="service__name">High Quality</h4>
              <p className="service__description">crafted from top materials</p>
            </div>
          </div>
          {/*End service-item*/}
          <div className="service-item">
            <img src="/testimonio.svg" className="service__image" />
            <div className="service-info">
              <h4 className="service__name">Warranty Protection</h4>
              <p className="service__description">Over 2 years</p>
            </div>
          </div>
          {/*End service-item*/}
          <div className="service-item">
            <img src="/ship.svg" className="service__image" />
            <div className="service-info">
              <h4 className="service__name">Free Shipping</h4>
              <p className="service__description">Order over 150 $</p>
            </div>
          </div>
          {/*End service-item*/}
          <div className="service-item">
            <img src="/support.svg" className="service__image" />
            <div className="service-info">
              <h4 className="service__name">24 / 7 Support</h4>
              <p className="service__description">Dedicated support</p>
            </div>
          </div>
          {/*End service-item*/}
        </div>
      </div>
    </section>
  );
};

export default Service;
