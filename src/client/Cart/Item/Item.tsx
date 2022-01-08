import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
  <Wrapper>
    <Button onClick={handleClickOpenDialog}> <img src={item.image} alt={item.title}/> </Button>
    <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>{item.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Category: {item.category}
            </DialogContentText>
            <DialogContentText>
              Description: {item.description}
            </DialogContentText>
            <DialogContentText>
              Price: ${item.price}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Ok</Button>
          </DialogActions>
    </Dialog>

    <div>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
);
}

export default Item;
