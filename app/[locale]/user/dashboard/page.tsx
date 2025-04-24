import { Card } from '@/components/ui/card';

import { DesktopCards, MobileCards } from './_components';

const PersonalInfoPage = () => {
  return (
    <Card className='shadow-none md:p-5 md:shadow-sm'>
      <MobileCards />
      <DesktopCards />
    </Card>
  );
};

export default PersonalInfoPage;
