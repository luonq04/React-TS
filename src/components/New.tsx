import ProductList from "./ProductList";

const New = () => {
  return (
    <section className="news">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">New</h2>
        </div>
        <ProductList sale={true} />
      </div>
    </section>
  );
};

export default New;
