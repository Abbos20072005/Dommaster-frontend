import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { paymentPage } from '@/content/trust/payment';

export const generateMetadata = () => getTrustMetadata(paymentPage);

const PaymentMethodsPage = () => <TrustPage content={paymentPage} faqPage='payment-methods' />;

export default PaymentMethodsPage;
