import React from "react";

// type Props = {};

const Filter = () => {
  return (
    <section className="results">
      <div className="container">
        <div className="results-wrapper">
          <div className="results-features">
            <div className="results-filter">
              <div className="results-filter__wrapper">
                <img src="/system-uicons_filtering.svg" alt="true" />
                <span>Filter</span>
              </div>
              <img src="/ci_grid-big-round.svg" alt="true" />
              <img src="/bi_view-list.svg" alt="true" />
            </div>
            <p className="results-product__page">
              Showing 1 - 16 of 32 results
            </p>
          </div>
          <div className="results-count">
            <div className="results-count__show">
              <span>Show</span>
              <span className="results-count__quantity">16</span>
            </div>
            <div className="results-count__short">
              <span>Short by</span>
              <span className="results-sort__by">Default</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;
