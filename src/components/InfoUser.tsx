const InfoUser = () => {
  return (
    <div className="info-user">
      <div className="info-user__wrapper">
        <h2 className="title-form">Billing details</h2>
        {/* Wrapper  */}
        <div className="info-user__form">
          <div className="info-user__group-2">
            <div className="info-user__field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" />
            </div>
            <div className="info-user__field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" />
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="company">Company Name (Optional)</label>
              <input type="text" id="company" />
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="country">Country / Region</label>
              <select name="country" id="country">
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="company">Company Name (Optional)</label>
              <input type="text" id="company" />
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="address">Street address</label>
              <input type="text" id="address" />
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="city">Town / City</label>
              <input type="text" id="city" />
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="company">Province</label>
              <select name="country" id="country">
                <option value="Western Province">Western Province</option>
              </select>
            </div>
          </div>
          <div className="info-user__group-1">
            <div className="info-user__field">
              <label htmlFor="zip">ZIP code</label>
              <input type="text" id="zip" />
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
              <input
                type="text"
                id="company"
                placeholder="Additional information"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
