const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="cart-info-1">
        <img src="https://picsum.photos/id/10/105/105" alt="Image product" />
        <p className="cart-product__name">Asgaard sofa</p>
      </div>
      <div className="cart-info-2">
        <span className="item-price">25.500.000đ</span>
        <div className="cart-total">
          <span className="item-quantity">1</span>
          <span>25.500.000đ</span>
          <i className="fa-solid fa-trash" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
