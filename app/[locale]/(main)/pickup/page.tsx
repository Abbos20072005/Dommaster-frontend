import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { pickupPage } from '@/content/services/pickup';

export const generateMetadata = () => getTrustMetadata(pickupPage);

const PickupPage = () => <TrustPage content={pickupPage} />;

export default PickupPage;
