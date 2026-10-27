import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { legalEntitiesPage } from '@/content/services/legalEntities';

export const generateMetadata = () => getTrustMetadata(legalEntitiesPage);

const LegalEntitiesPage = () => <TrustPage content={legalEntitiesPage} />;

export default LegalEntitiesPage;
