import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { privacyRequestPage } from '@/content/trust/privacyExtra';

export const generateMetadata = () => getTrustMetadata(privacyRequestPage);

const PrivacyRequestPage = () => <TrustPage content={privacyRequestPage} />;

export default PrivacyRequestPage;
