import PurchaseItem from './PurchaseItem/PurchaseItem'
import { Wrapper } from './Purchase.styles';
import * as React from 'react';
import { useQuery } from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CartItemType } from '../App';

export type purchaseItemType = {
  purchaseId: number;
  purchaseItems: CartItemType[];
  purchaseTotal: number;
};

const Purchase: React.FC = () => {

    // API call for the recent purchase
    const getRecentPurchase = async () =>
        await (await fetch(`api/purchaseItems`)).json();

    const { data, isLoading, error } = useQuery<purchaseItemType[]>(
        'recentPurchase',
        getRecentPurchase
    );
    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong ...</div>;

    return (
      <Wrapper>
        <h2>Recent Purchases</h2>
        {data?.length === 0 ? <p>No Recent Purchase.</p> : null}
        {data?.map(item => (
          <PurchaseItem
            items={item.purchaseItems}
            total={item.purchaseTotal}
          />
        ))}
      </Wrapper>
    );
};

export default Purchase;