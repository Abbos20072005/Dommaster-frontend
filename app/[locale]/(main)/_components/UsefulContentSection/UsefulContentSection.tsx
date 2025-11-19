import { ArrowRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';

import { ArticlesTab, NewsTab, ReviewsTab, VideosTab } from './components';

export const UsefulContentSection = async () => {
  const t = await getTranslations();

  return (
    <section>
      <BaseLayout>
        <Tabs defaultValue='news'>
          <div className='flex items-center justify-between'>
            <TabsList className='w-full sm:w-auto'>
              <TabsTrigger className='px-10' value='news'>
                {t('News')}
              </TabsTrigger>
              {/*<TabsTrigger value='articles'>{t('Articles')}</TabsTrigger>*/}
              {/*<TabsTrigger value='reviews'>{t('Reviews')}</TabsTrigger>*/}
              <TabsTrigger className='px-10' value='videos'>
                {t('Videos')}
              </TabsTrigger>
            </TabsList>
            <TabsContent className='hidden flex-none sm:block' value='news'>
              <Button asChild size='sm' variant='muted'>
                <Link href='/news'>
                  {t('View all')}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </TabsContent>
            <TabsContent className='hidden flex-none sm:block' value='articles'>
              <Button asChild size='sm' variant='muted'>
                <Link href='/articles'>
                  {t('View all')}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </TabsContent>
            <TabsContent className='hidden flex-none sm:block' value='reviews'>
              <Button asChild size='sm' variant='muted'>
                <Link href='/reviews'>
                  {t('View all')}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </TabsContent>
            <TabsContent className='hidden flex-none sm:block' value='videos'>
              <Button asChild size='sm' variant='muted'>
                <a href='https://www.youtube.com/buildex' rel='noreferrer' target='_blank'>
                  {t('View all')}
                  <ArrowRightIcon />
                </a>
              </Button>
            </TabsContent>
          </div>
          <TabsContent value='news'>
            <NewsTab />
            <Button asChild className='mt-2 w-full sm:hidden' size='sm' variant='muted'>
              <Link href='/news'>{t('View all')}</Link>
            </Button>
          </TabsContent>
          <TabsContent value='articles'>
            <ArticlesTab />
            <Button asChild className='mt-2 w-full sm:hidden' size='sm' variant='muted'>
              <Link href='/articles'>{t('View all')}</Link>
            </Button>
          </TabsContent>
          <TabsContent value='reviews'>
            <ReviewsTab />
            <Button asChild className='mt-2 w-full sm:hidden' size='sm' variant='muted'>
              <Link href='/reviews'>{t('View all')}</Link>
            </Button>
          </TabsContent>
          <TabsContent value='videos'>
            <VideosTab />
            <Button asChild className='mt-2 w-full sm:hidden' size='sm' variant='muted'>
              <a href='https://www.youtube.com/dommaster' rel='noreferrer' target='_blank'>
                {t('View all')}
              </a>
            </Button>
          </TabsContent>
        </Tabs>
      </BaseLayout>
    </section>
  );
};
