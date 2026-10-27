import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { liftingPage } from '@/content/services/lifting';

export const generateMetadata = () => getTrustMetadata(liftingPage);

const LiftingPage = () => <TrustPage content={liftingPage} />;

export default LiftingPage;
