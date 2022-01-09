import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, emptyCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    cartItems.length === 0 ? alert("No items in the cart to purchase") : setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // API call to the post purchase items
  const postCartItem = (items: CartItemType[]) => {

    const purchase = {
      items: items,
      total:  calculateTotal(cartItems).toFixed(2)
    }

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchase)
    };

    fetch('/api/purchaseItems', request)
    .then(res => res.json())
    .then(data => {
      handleCloseDialog();
      emptyCart();
    })
    .catch(rejected => {
      console.log(rejected);
    });
  }

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button color="primary" variant="contained" onClick={handleClickOpenDialog}>Checkout</Button>
      <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your total payment for this order is ${calculateTotal(cartItems).toFixed(2)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={ () => postCartItem(cartItems) }>Purchase</Button>
            <Button variant="contained" onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
    </Dialog>
    </Wrapper>
  );
};

export default Cart;
