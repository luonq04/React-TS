import { Link } from "react-router-dom";

const Header = () => {


  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="header__logo">
            <img src="/logo.svg" alt="true" />
          </Link>
          <nav className="main-menu">
            <ul className="main-menu__list">
              <li className="main-menu__item">
                <Link to="/" className="main-menu__link">
                  Home
                </Link>
              </li>
              <li className="main-menu__item">
                <Link to="/shop" className="main-menu__link">
                  Shop
                </Link>
              </li>
              <li className="main-menu__item">
                <Link to="" className="main-menu__link">
                  About
                </Link>
              </li>
              <li className="main-menu__item">
                <Link to="" className="main-menu__link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-items">
            <img src="/mdi_account-alert-outline.svg" alt="true" />
            <img src="/akar-icons_search.svg" alt="true" />
            <img src="/akar-icons_heart.svg" alt="true" />
            <Link to="cart">
              <img src="/ant-design_shopping-cart-outlined.svg" alt="true" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
