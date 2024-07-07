import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { foodList, cartItems, cartAmount, token, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Place Order
  const handleSubmit = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: cartAmount + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error Occurred");
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delevery Info</p>
        <div className="multi-fields">
          <input
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            required
          />
        </div>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Email Address"
          name="email"
          value={data.email}
          required
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            onChange={handleChange}
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Zip Code"
            name="zipcode"
            value={data.zipcode}
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            required
          />
        </div>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${cartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${cartAmount ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${cartAmount ? cartAmount + 2 : 0}</p>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
