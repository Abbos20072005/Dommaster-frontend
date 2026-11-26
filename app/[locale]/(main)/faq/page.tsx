import type { Metadata } from 'next';

import { getLocale, getTranslations } from 'next-intl/server';

import { FaqTopicNav } from '@/components/FaqTopicNav';
import { FaqTopics } from '@/components/FaqTopics';
import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { loadFaq, localizeFaqHtml } from '@/lib/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonLd';
import { withLocale } from '@/lib/localePath';
import { shareCards } from '@/lib/seo';
import { CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL_LINKS } from '@/utils/constants';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const faq = await loadFaq(await getLocale());

  const title = t('FAQ meta title');
  const description = t('metadata.pages.faq');

  return {
    title: { absolute: title },
    description,
    ...shareCards({ title, description }),
    // a page without questions (the API is silent, or the admin has not made them yet) is not offered
    ...(faq?.length ? {} : { robots: { index: false, follow: true } })
  };
}

const buttonClass =
  'inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-bold transition-colors';

/** All the questions of the admin by topics, with the list of topics on top. */
const FaqPage = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const topics = await loadFaq(locale);

  const faqData = topics && faqJsonLd(topics, (html) => localizeFaqHtml(html, locale));

  return (
    <div>
      {faqData && <JsonLd data={faqData} />}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('Home'), path: withLocale('/', locale) },
          { name: t('FAQ'), path: withLocale('/faq', locale) }
        ])}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 max-w-4xl space-y-4 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('FAQ')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg font-bold md:text-3xl lg:text-4xl'>{t('FAQ')}</h1>

        {topics?.length ? (
          topics.length > 1 ? (
            <FaqTopicNav topics={topics}>
              <FaqTopics locale={locale} titles topics={topics} />
            </FaqTopicNav>
          ) : (
            <FaqTopics locale={locale} titles topics={topics} />
          )
        ) : (
          <p className='text-muted-foreground text-[15px] leading-7'>{t('FAQ empty')}</p>
        )}

        <section className='bg-primary/5 border-primary/15 grid gap-3 rounded-2xl border p-5 md:p-6'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('FAQ not found title')}</h2>
          <p className='text-[15px] leading-7'>{t('FAQ not found text')}</p>
          <div className='flex flex-wrap gap-2'>
            <a
              className={`${buttonClass} bg-primary hover:bg-primary/90 text-white`}
              href={CONTACT_PHONE_HREF}
            >
              {CONTACT_PHONE}
            </a>
            <a
              className={`${buttonClass} border-primary text-primary hover:bg-primary/5 border bg-white`}
              href={SOCIAL_LINKS.telegram}
              rel='noreferrer'
              target='_blank'
            >
              Telegram
            </a>
          </div>
        </section>
      </BaseLayout>
    </div>
  );
};

export default FaqPage;
