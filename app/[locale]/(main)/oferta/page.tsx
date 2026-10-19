import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { ofertaPage } from '@/content/trust/oferta';

export const generateMetadata = () => getTrustMetadata(ofertaPage);

const OfertaPage = () => <TrustPage content={ofertaPage} />;

export default OfertaPage;
