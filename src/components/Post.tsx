import React from "react";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <section className="post">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title--blog">BLOG</h2>
        </div>
        <div className="section-body">
          <div className="post-list">
            <div className="post-item">
              <img
                src="https://picsum.photos/id/16/605/250"
                alt="true"
                className="post__thumbnail"
              />
              <div className="post-info">
                <h3 className="post__title">
                  <Link to="" className="post__link">
                    THE ULTIMATE SOFA BUYING GUIDE
                  </Link>
                </h3>
                <p className="post__excerpt">
                  The versatility of our living space is more crucial than ever.
                  But buying a sofa might be a difficult undertaking. Your needs
                  and the size of your living area will determine everything,
                  However, don’t worry, were are here to help you
                </p>
                <div className="post__detail">
                  <span className="post__about">ABOUT</span>
                  <span>
                    <i className="fa-solid fa-arrow-right icon-blog" />
                  </span>
                </div>
              </div>
            </div>
            {/*End .post-item*/}
            <div className="post-item">
              <img
                src="https://picsum.photos/id/17/605/250"
                alt="true"
                className="post__thumbnail"
              />
              <div className="post-info">
                <h3 className="post__title">
                  <Link to="" className="post__link">
                    THE ULTIMATE SOFA BUYING GUIDE
                  </Link>
                </h3>
                <p className="post__excerpt">
                  The versatility of our living space is more crucial than ever.
                  But buying a sofa might be a difficult undertaking. Your needs
                  and the size of your living area will determine everything,
                  However, don’t worry, were are here to help you
                </p>
                <div className="post__detail">
                  <span className="post__about">ABOUT</span>
                  <span>
                    <i className="fa-solid fa-arrow-right icon-blog" />
                  </span>
                </div>
              </div>
            </div>
            {/*End .post-item*/}
            <div className="post-item">
              <img
                src="https://picsum.photos/id/18/605/250"
                alt="true"
                className="post__thumbnail"
              />
              <div className="post-info">
                <h3 className="post__title">
                  <Link to="" className="post__link">
                    THE ULTIMATE SOFA BUYING GUIDE
                  </Link>
                </h3>
                <p className="post__excerpt">
                  The versatility of our living space is more crucial than ever.
                  But buying a sofa might be a difficult undertaking. Your needs
                  and the size of your living area will determine everything,
                  However, don’t worry, were are here to help you
                </p>
                <div className="post__detail">
                  <span className="post__about">ABOUT</span>
                  <span>
                    <i className="fa-solid fa-arrow-right icon-blog" />
                  </span>
                </div>
              </div>
            </div>
            {/*End .post-item*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
