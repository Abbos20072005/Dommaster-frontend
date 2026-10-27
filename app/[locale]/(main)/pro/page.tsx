import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { proPage } from '@/content/services/pro';

export const generateMetadata = () => getTrustMetadata(proPage);

const ProPage = () => <TrustPage content={proPage} />;

export default ProPage;
