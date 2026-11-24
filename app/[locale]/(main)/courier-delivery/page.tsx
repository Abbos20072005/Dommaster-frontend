import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { deliveryPage } from '@/content/trust/delivery';

export const generateMetadata = () => getTrustMetadata(deliveryPage);

const CourierDeliveryPage = () => <TrustPage content={deliveryPage} faqPage='courier-delivery' />;

export default CourierDeliveryPage;
