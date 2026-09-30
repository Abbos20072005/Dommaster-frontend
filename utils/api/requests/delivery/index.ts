import { api } from '@/utils/api/instance';

export const postDeliveryCheckPrice = ({
  data,
  config
}: RequestConfig<DeliveryCheckPriceRequest>) =>
  api.post<DeliveryCheckPriceResponse>('/integration/yandex/check-price/', data, config);
