import { Link } from "react-router-dom";

const Breadcrumb = ({ name }: { name: string }) => {
  return (
    <section className="breadcrumb">
      <div className="container">
        <ul className="breadcrumb-list">
          <li>
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="breadcrumb-link">
              Shop
            </Link>
          </li>
          <li>
            <Link to="" className="breadcrumb-product">
              {name}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Breadcrumb;
