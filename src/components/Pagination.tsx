import React from "react";

type Props = {};

const Pagination = (props: Props) => {
  return (
    <div>
      <section className="pagination">
        <button className="pagination-button pagination-button__current">
          1
        </button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">Next</button>
      </section>
    </div>
  );
};

export default Pagination;
