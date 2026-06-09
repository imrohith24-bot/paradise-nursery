import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Amount: ${calculateTotalAmount()}</h3>
      
      <div>
        {cartItems.map((item) => (
          <div key={item.name} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
            <div>
              <h4>{item.name}</h4>
              <p>Unit Price: ${item.cost}</p>
              <p>Subtotal: ${(item.cost * item.quantity)}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Checkout functionality coming soon!')}>Checkout (Coming Soon)</button>
      </div>
    </div>
  );
}

export default CartItem;
