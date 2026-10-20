import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { privacyPartnersPage } from '@/content/trust/privacyExtra';

export const generateMetadata = () => getTrustMetadata(privacyPartnersPage);

const PrivacyPartnersPage = () => <TrustPage content={privacyPartnersPage} />;

export default PrivacyPartnersPage;
