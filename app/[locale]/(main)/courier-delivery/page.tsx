import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { deliveryPage } from '@/content/trust/delivery';

export const generateMetadata = () => getTrustMetadata(deliveryPage);

const CourierDeliveryPage = () => <TrustPage content={deliveryPage} />;

export default CourierDeliveryPage;