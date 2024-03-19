import React from "react";
import InfoUser from "./InfoUser";
import MethodPay from "./MethodPay";

const Bill = () => {
  return (
    <section className="bill">
      <div className="container">
        <div className="bill-detail">
          <InfoUser />
          <MethodPay />
        </div>
      </div>
    </section>
  );
};

export default Bill;
