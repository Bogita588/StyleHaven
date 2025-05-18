// src/components/CartItem/CartItem.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './CartItem.css';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <Card className="cart-item">
      <CardMedia
        component="img"
        image={item.images[0]}
        alt={item.title}
        className="cart-item__image"
      />

      <CardContent className="cart-item__content">
        <Typography variant="subtitle1" className="cart-item__title">
          {item.title}
        </Typography>

        <Typography variant="body2" className="cart-item__price">
          Price: ${item.price.toFixed(2)}
        </Typography>

        <div className="cart-item__controls">
          <IconButton onClick={() => onDecrease(item)} size="small">
            <RemoveIcon />
          </IconButton>
          <Typography className="cart-item__quantity">{item.quantity}</Typography>
          <IconButton onClick={() => onIncrease(item)} size="small">
            <AddIcon />
          </IconButton>
        </div>

        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => onRemove(item)}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItem;
