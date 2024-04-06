const InfoUser = () => {
  return (
    <div className="info-user">
      <div className="info-user__wrapper">
        <h2 className="title-form">Billing details</h2>
        {/* Wrapper  */}
        <div className="info-user__form">
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="phone">Name</label>
              <input type="text" id="name" />
            </div>
          </div>

          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" />
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="company">Email address</label>
              <input type="email" id="email" />
            </div>
          </div>

          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="city">Town / City</label>
              <input type="text" id="city" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
