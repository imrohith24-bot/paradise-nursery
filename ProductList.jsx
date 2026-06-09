import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    { category: "Air Purifying", name: "Snake Plant", cost: 15, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Spider Plant", cost: 12, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Peace Lily", cost: 18, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Boston Fern", cost: 14, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Rubber Plant", cost: 20, image: "https://via.placeholder.com/150" },
    { category: "Air Purifying", name: "Aloe Vera", cost: 10, image: "https://via.placeholder.com/150" },
    { category: "Aromatic", name: "Lavender", cost: 16, image: "https://via.placeholder.com/150" },
    { category: "Aromatic", name: "Mint", cost: 8, image: "https://via.placeholder.com/150" },
    { category: "Aromatic", name: "Rosemary", cost: 12, image: "https://via.placeholder.com/150" },
    { category: "Aromatic", name: "Basil", cost: 6, image: "https://via.placeholder.com/150" },
    { category: "Aromatic", name: "Thyme", cost: 7, image: "https://via.placeholder.com/150" },
    { category: "Aromatic", name: "Oregano", cost: 9, image: "https://via.placeholder.com/150" },
    { category: "Insect Repellent", name: "Marigold", cost: 11, image: "https://via.placeholder.com/150" },
    { category: "Insect Repellent", name: "Citronella", cost: 15, image: "https://via.placeholder.com/150" },
    { category: "Insect Repellent", name: "Pitcher Plant", cost: 25, image: "https://via.placeholder.com/150" },
    { category: "Insect Repellent", name: "Venus Flytrap", cost: 22, image: "https://via.placeholder.com/150" },
    { category: "Insect Repellent", name: "Catnip", cost: 10, image: "https://via.placeholder.com/150" },
    { category: "Insect Repellent", name: "Lemon Balm", cost: 13, image: "https://via.placeholder.com/150" }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav className="navbar">
        <div onClick={() => window.location.reload()} style={{cursor: 'pointer'}}>
          <h2>Paradise Nursery</h2>
        </div>
        <div>
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            Cart ({totalQuantity})
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {["Air Purifying", "Aromatic", "Insect Repellent"].map((category) => (
            <div key={category} style={{ width: '100%' }}>
              <h2>{category}</h2>
              <div className="product-grid">
                {plantsArray.filter(plant => plant.category === category).map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                    >
                      {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
