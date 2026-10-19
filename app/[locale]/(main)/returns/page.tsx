import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { returnsPage } from '@/content/trust/returns';

export const generateMetadata = () => getTrustMetadata(returnsPage);

const ReturnsPage = () => <TrustPage content={returnsPage} />;

export default ReturnsPage;
