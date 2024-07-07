import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const { foodList, cartItems, addToCart, removeFromCart, url, cartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {foodList?.map((item) => {
          if (cartItems[item._id]) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={ item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p className="cart-items-quantity">
                    <button
                      disabled={cartItems[item._id] === 1}
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      -
                    </button>
                    <span>{cartItems[item._id]}</span>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="cross"
                    >
                      +
                    </button>
                  </p>
                  <p>${item?.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => {
                      confirm("Are You Sure to REMOVE this Item")
                        ? removeFromCart(item._id, true)
                        : null;
                    }}
                    className="cross"
                  >
                    remove
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
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
          <button onClick={() => navigate("/placeorder")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promocode enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// mongosh "mongodb+srv://cluster0.g5pwty0.mongodb.net/" --apiVersion 1 --username om --password Password@54321
