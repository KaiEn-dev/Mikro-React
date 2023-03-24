import React, { useContext } from "react";

function ContactForm({ customerInfo, setCustomerInfo, error, displayError }) {
  const handleChange = (value, id) => {
    let newInfo = { ...customerInfo };
    newInfo[id] = value;
    setCustomerInfo(newInfo);
  };

  return (
    <div>
      <form className="ps-1 pe-1">
        <div className="form-group mb-2">
          <label htmlFor="name" className="ms-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control "
            value={customerInfo.name}
            onChange={(e) =>
              handleChange(e.currentTarget.value, e.currentTarget.id)
            }
          />
          {displayError("name")}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email" className="ms-1">
            Email address
          </label>
          <input
            id="email"
            type="text"
            className="form-control"
            value={customerInfo.email}
            onChange={(e) =>
              handleChange(e.currentTarget.value, e.currentTarget.id)
            }
          />
          {displayError("email")}
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="ms-1">
            Phone number
          </label>
          <input
            id="phone"
            type="text"
            className="form-control"
            value={customerInfo.phone}
            onChange={(e) =>
              handleChange(e.currentTarget.value, e.currentTarget.id)
            }
          />
          {displayError("phone")}
        </div>
        <div id="emailHelp" className="form-text mt-2">
          We'll never share your personal information with anyone else.
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
