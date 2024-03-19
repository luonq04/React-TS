import React from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <section className="shop" data-aos="fade-up" data-aos-duration={1200}>
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title--shop">Shop</h2>
        </div>
        <div className="section-body">
          <div className="shops">
            <div className="shop-item">
              <Link to="" className="shop__link">
                <img
                  src="https://picsum.photos/id/12/665/500"
                  alt="true"
                  className="shop__image"
                />
              </Link>
            </div>
            <div className="shop-item">
              <Link to="" className="shop__link">
                <img
                  src="https://picsum.photos/id/13/665/500"
                  alt="true"
                  className="shop__image"
                />
              </Link>
            </div>
            <div className="shop-item">
              <Link to="" className="shop__link">
                <img
                  src="https://picsum.photos/id/14/665/500"
                  alt="true"
                  className="shop__image"
                />
              </Link>
            </div>
            <div className="shop-item">
              <Link to="" className="shop__link">
                <img
                  src="https://picsum.photos/id/15/665/500"
                  alt="true"
                  className="shop__image"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
