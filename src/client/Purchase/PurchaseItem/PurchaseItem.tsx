// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './PurchaseItem.styles';

type Props = {
  items: CartItemType[];
  total: number;
};

const RecentPurchaseItem: React.FC<Props> = ({items,total}) => {
  return(<Wrapper>
    {items?.map(item => (
         <div className="item">
           <div>
             <h3>{item.title}</h3>
             <div>
               <p>Amount: {item.amount}</p>
               <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
             </div>
           </div>
           <img src={item.image} alt={item.title} />
         </div>
       ))}
       <h3>Order Total: ${total}</h3>
  </Wrapper>
);
};

export default RecentPurchaseItem;
