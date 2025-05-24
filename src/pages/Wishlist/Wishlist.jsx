import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../redux/wishlistSlice';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleClearAll = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>Your Wishlist</h2>
        {wishlistItems.length > 0 && (
          <button onClick={handleClearAll} className="clear-btn">
            Clear All
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <p className="empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img src={item.images[0]} alt={item.title} />
              <h4>{item.title}</h4>
              <p className="price">${item.price.toFixed(2)}</p>
              <div className="wishlist-actions">
                <Link to={`/product/${item.id}`} className="view-btn">
                  View Product
                </Link>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
