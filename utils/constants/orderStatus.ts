export const orderStatusMap: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: 'В ожидании',
  [OrderStatus.Collecting]: 'Собирается',
  [OrderStatus.Delivering]: 'Доставляется',
  [OrderStatus.Delivered]: 'Доставлен',
  [OrderStatus.Canceled]: 'Отменен'
};
