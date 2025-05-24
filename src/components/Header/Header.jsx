import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, IconButton, InputBase } from '@mui/material';
import {
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutline,
  Menu,
  Close,
} from '@mui/icons-material';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // ✅ Grab wishlist and cart item counts from Redux
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <header className="header">
      <div className="header__content">

        {/* Logo */}
        <div className="header__logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Style<span>Haven</span>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <IconButton
          className="header__menu-icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          size="large"
        >
          {menuOpen ? <Close /> : <Menu />}
        </IconButton>

        {/* Nav Links */}
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        {/* Search Bar */}
        <div className="header__search">
          <InputBase placeholder="Search products…" />
        </div>

        {/* Icons */}
        <div className="header__icons">
          <IconButton
            component={Link}
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
          >
            <Badge badgeContent={wishlistCount} color="secondary">
              <FavoriteBorder />
            </Badge>
          </IconButton>

          <IconButton
            component={Link}
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>

          <IconButton
            component={Link}
            to="/profile"
            onClick={() => setMenuOpen(false)}
          >
            <PersonOutline />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
