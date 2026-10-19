import { getTrustMetadata, TrustPage } from '@/components/TrustPage';
import { contactsPage } from '@/content/trust/contacts';

export const generateMetadata = () => getTrustMetadata(contactsPage);

const ContactsPage = () => <TrustPage content={contactsPage} />;

export default ContactsPage;
