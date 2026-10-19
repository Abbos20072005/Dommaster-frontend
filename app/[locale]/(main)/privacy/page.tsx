import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { privacyPage } from '@/content/trust/privacy';

export const generateMetadata = () => getTrustMetadata(privacyPage);

const PrivacyPage = () => <TrustPage content={privacyPage} />;

export default PrivacyPage;
