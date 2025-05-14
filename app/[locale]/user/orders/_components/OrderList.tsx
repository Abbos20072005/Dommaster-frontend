import { OrderItem } from './OrderItem';

interface Props {
  orders: OrderPreview[];
}

export const OrderList = ({ orders }: Props) => {
  return (
    <div className='space-y-4'>
      {orders.map((order) => (
        <div key={order.id}>
          <OrderItem key={order.id} order={order} />
        </div>
      ))}
    </div>
  );
};
